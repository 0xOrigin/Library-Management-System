import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Role } from 'src/config';
import { HasherUtils } from 'src/utils';
import { User } from '../../modules/users/models/user.model';

@Injectable()
export class AdminSeeder {
  private readonly logger = new Logger(AdminSeeder.name);
  private readonly hashService = new HasherUtils();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    const adminData = {
      email: this.configService.get<string>('ADMIN_EMAIL') ?? 'admin@admin.com',
      username: this.configService.get<string>('ADMIN_USERNAME') ?? 'admin',
      password: this.configService.get<string>('ADMIN_PASSWORD') ?? 'admin',
      role: Role.ADMIN,
    };

    let instance;
    try {
      instance = await this.userRepository.findOne({
        where: { email: adminData.email, username: adminData.username },
      }); // Check if admin already exists
    } catch (error) {
      this.logger.error(`Error while seeding admin: ${error.message}`);
    }
    if (instance) return;

    // Hash password and save admin to database
    const salt = await this.hashService.genSalt();
    const password = await this.hashService.hashPassword(
      salt,
      adminData.password,
    );
    try {
      await this.userRepository.insert({
        role: adminData.role,
        email: adminData.email,
        username: adminData.username,
        password,
      });
      this.logger.log('Admin seeded successfully');
    } catch (error) {
      this.logger.warn(`Error while seeding admin: ${error.message}`);
    }
  }
}
