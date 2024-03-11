import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseInterceptor, LoggerInterceptor } from 'src/interceptors';
import { CoreController } from 'src/modules/core/controllers/core.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { Roles } from 'src/decorators';
import { Role } from 'src/config/constants';
import { ObjectPermissionGuard } from '../guards/object-permission.guard';
import { UserSerializer } from '../serializers/user.serializer';

@UseInterceptors(ResponseInterceptor, LoggerInterceptor)
@UseGuards(ThrottlerGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController extends CoreController {
  constructor(private readonly usersService: UsersService) {
    super(usersService, UserSerializer);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(createUserDto: CreateUserDto): Promise<any> {
    return await super.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(filterDto: FilterUserDto): Promise<any> {
    return await super.findAll(filterDto);
  }

  @Roles(...Object.values(Role))
  @UseGuards(ObjectPermissionGuard)
  @Get(':id')
  async findOne(id: string): Promise<any> {
    return await super.findOne(id);
  }

  @Roles(...Object.values(Role))
  @UseGuards(ObjectPermissionGuard)
  @Put(':id')
  async update(id: string, updateDto: UpdateUserDto): Promise<any> {
    return await super.update(id, updateDto);
  }

  @Roles(...Object.values(Role))
  @UseGuards(ObjectPermissionGuard)
  @Patch(':id')
  async updatePartial(id: string, updateDto: UpdateUserDto): Promise<any> {
    return await super.updatePartial(id, updateDto);
  }

  @Roles(...Object.values(Role))
  @UseGuards(ObjectPermissionGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(id: string): Promise<void> {
    await super.remove(id, true);
  }
}
