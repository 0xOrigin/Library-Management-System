import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle, ThrottlerGuard, seconds } from '@nestjs/throttler';
import { LoggerInterceptor, ResponseInterceptor } from 'src/interceptors';
import { CurrentUser } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { CoreController } from 'src/modules/core/controllers/core.controller';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthSerializer } from '../serializers/auth.serializer';
import * as constants from 'src/config/constants';

@UseInterceptors(ResponseInterceptor, LoggerInterceptor)
@UseGuards(ThrottlerGuard)
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController extends CoreController {
  private jwtAccessTokenCookieName: string;
  private jwtRefreshTokenCookieName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super(authService, AuthSerializer);
    this.jwtAccessTokenCookieName = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_COOKIE_NAME',
    );
    this.jwtRefreshTokenCookieName = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_COOKIE_NAME',
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);
    response.cookie(this.jwtAccessTokenCookieName, accessToken, {
      httpOnly: true,
      expires: constants.JWT_ACCESS_TOKEN_EXPIRES_IN_DATE(),
    });
    response.cookie(this.jwtRefreshTokenCookieName, refreshToken, {
      httpOnly: true,
      expires: constants.JWT_REFRESH_TOKEN_EXPIRES_IN_DATE(),
    });
    return { accessToken };
  }

  @Throttle({ default: { limit: 3, ttl: seconds(60) } })
  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return await this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Throttle({ default: { limit: 4, ttl: seconds(30) } })
  @Get('me')
  me(@CurrentUser() user: object) {
    return this.serialize(user);
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(this.jwtAccessTokenCookieName);
    response.clearCookie(this.jwtRefreshTokenCookieName);
    return await this.authService.logout();
  }
}
