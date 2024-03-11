import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { User } from '../models/user.model';
import { CoreService } from 'src/modules/core/services/core.service';
import { HasherUtils } from 'src/utils';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService extends CoreService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HasherUtils,
    i18nService: I18nService,
  ) {
    super(userRepository, i18nService);
  }

  public getSelectForFindOne(): (keyof User)[] {
    return [
      'id',
      'firstName',
      'lastName',
      'username',
      'email',
      'picture',
      'phoneNumber',
      'address',
      'city',
      'role',
    ];
  }

  getSelectForFindAll(): (keyof User)[] {
    return this.getSelectForFindOne();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await this.hashService.genSalt();
    const password = await this.hashService.hashPassword(
      salt,
      createUserDto.password,
    );
    const instance = await this.userRepository.save({
      ...createUserDto,
      password,
    });
    return instance;
  }
}
