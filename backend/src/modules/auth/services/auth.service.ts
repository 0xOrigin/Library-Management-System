import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { HasherUtils } from 'src/utils';
import { JwtPayload } from 'src/middlewares';
import * as constants from 'src/config/constants';
import { CoreService } from 'src/modules/core/services/core.service';
import { User } from 'src/modules/users/models/user.model';
import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthService extends CoreService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HasherUtils,
    private readonly jwtService: JwtService,
    i18nService: I18nService,
  ) {
    super(userRepository, i18nService);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (
      !user ||
      !(await this.hashService.comparePassword(password, user.password))
    )
      throw new UnauthorizedException('Invalid credentials');

    const payload = <JwtPayload>{ id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: constants.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: constants.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async register(registerDto: RegisterUserDto) {
    const { username, email } = registerDto;
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (user) throw new BadRequestException('User already exists');

    const salt = await this.hashService.genSalt();
    const password = await this.hashService.hashPassword(
      salt,
      registerDto.password,
    );
    const instance = await this.userRepository.save({
      ...registerDto,
      password,
    });
    return new RegisterUserDto(instance);
  }

  async logout() {
    // logic to logout
  }
}
