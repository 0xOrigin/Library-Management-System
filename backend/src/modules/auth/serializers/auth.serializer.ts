import { Exclude, Expose } from 'class-transformer';
import { ROLE_TYPE } from 'src/config/constants';

export class AuthSerializer {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Expose()
  picture: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose()
  role: ROLE_TYPE;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<AuthSerializer>) {
    Object.assign(this, partial);
  }
}
