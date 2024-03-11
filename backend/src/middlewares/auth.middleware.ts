import { NextFunction, Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/models/user.model';
import * as constants from 'src/config/constants';
import { JwtPayload } from './auth.payload';
import { TokenGetterType } from './auth-middleware.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private getAccessTokenFromHeader(req: Request): TokenGetterType {
    return { token: req.headers.authorization, location: 'header' };
  }

  private getAccessTokenFromCookie(req: Request): TokenGetterType {
    const jwt_access_token_cookie_name = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_COOKIE_NAME',
    );
    return { token: req.cookies[jwt_access_token_cookie_name], location: 'cookie' };
  }

  private getAccessToken(req: Request): TokenGetterType {
    const accessTokenFromHeader = this.getAccessTokenFromHeader(req);
    if (accessTokenFromHeader.token) return accessTokenFromHeader;
    const accessTokenFromCookie = this.getAccessTokenFromCookie(req);
    return accessTokenFromCookie;
  }

  private validateAccessTokenFromHeader({ token, location }: TokenGetterType): boolean {
    if (!token) return false;
    if (location !== 'header') return true;

    const [type, accessToken] = token.split(' ');
    return (
      type !== undefined &&
      constants.AUTH_HEADER_TYPES.includes(type) &&
      accessToken !== undefined &&
      accessToken.length > 0
    );
  }

  private async verifyAccessToken(
    accessToken: string,
  ): Promise<JwtPayload> | never {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async use(request: Request, response: Response, next: NextFunction) {
    const { token, location } = this.getAccessToken(request);
    if (!token) return next();

    if (!this.validateAccessTokenFromHeader({ token, location }))
      throw new UnauthorizedException('Invalid access token');

    const payload = await this.verifyAccessToken(token);
    const user = await this.userRepository.findOneBy({ id: payload.id });
    if (!user) throw new UnauthorizedException('Invalid access token');

    Object.defineProperty(request, 'user', {
      value: user,
      writable: false,
    });
    next();
  }
}
