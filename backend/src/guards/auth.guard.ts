import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const hasUserProperty = request.hasOwnProperty('user');
    if (!hasUserProperty)
      throw new UnauthorizedException(
        'Authentication credentials were not provided.',
      );
    return true;
  }
}
