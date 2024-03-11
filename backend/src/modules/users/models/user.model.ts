import { Entity, Column } from 'typeorm';
import { ROLE_TYPE } from 'src/config/constants';
import { Audit } from 'src/modules/core/models/audit.model';

@Entity()
export class User extends Audit {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true, nullable: false, length: 30 })
  username: string;

  @Column({ unique: true, nullable: false, length: 50 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: null })
  picture: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({
    nullable: false,
    type: 'timestamp with time zone',
    update: false,
    default: () => 'now()',
  })
  registrationDate: Date;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @Column({ nullable: false })
  role: ROLE_TYPE;
}
