import { Injectable, ExecutionContext } from '@nestjs/common';
import { ROLE_TYPE, Role } from 'src/config/constants';
import { RolesGuard } from 'src/guards';

@Injectable()
export class ObjectPermissionGuard extends RolesGuard {
  hasObjectPermission(
    context: ExecutionContext,
    requiredRoles: ROLE_TYPE[],
  ): void | never {
    const { user } = context.switchToHttp().getRequest();
    const hasPermission =
      requiredRoles.some((role) => user.role === role && role === Role.ADMIN) ||
      user.id === context.switchToHttp().getRequest().params.id;

    if (!hasPermission) this.raiseForbiddenException();
  }
}
