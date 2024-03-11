import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/config';

@Injectable()
export class HasherUtils {

  async genSalt(rounds: number = SALT_ROUNDS): Promise<string> {
    return await bcrypt.genSalt(rounds);
  }

  async hashPassword(salt: string, password: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
