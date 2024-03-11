import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, ROLE_TYPE } from 'src/config/constants';
import { AuthGuard } from './auth.guard';

@Injectable()
export class RolesGuard extends AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequiredRoles(context: ExecutionContext): ROLE_TYPE[] {
    return this.reflector.getAllAndOverride<ROLE_TYPE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  raiseForbiddenException(message?: string): never {
    throw new ForbiddenException(
      message ?? 'You do not have permission to perform this action.',
    );
  }

  hasModelPermission(
    context: ExecutionContext,
    requiredRoles: ROLE_TYPE[],
  ): void | never {
    const { user } = context.switchToHttp().getRequest();
    const hasPermission = requiredRoles.some((role) => user.role === role);

    if (!hasPermission) this.raiseForbiddenException();
  }

  hasObjectPermission(
    context: ExecutionContext,
    requiredRoles: ROLE_TYPE[],
  ): void | never {
    // This method will be overridden by the ObjectPermissionGuard
  }

  canActivate(context: ExecutionContext): boolean | never {
    const requiredRoles = this.getRequiredRoles(context);
    if (!requiredRoles) return true; // If no roles are required, allow access

    super.canActivate(context); // Call the parent canActivate method to check for authentication credentials
    this.hasModelPermission(context, requiredRoles);
    this.hasObjectPermission(context, requiredRoles);

    return true;
  }
}
