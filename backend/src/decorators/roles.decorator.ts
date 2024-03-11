import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, ROLE_TYPE } from 'src/config/constants';

export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata(ROLES_KEY, roles);
