import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((result: any) => {
        if (!result) return;
        return {
          statusCode: response.statusCode,
          message: response.statusMessage ?? 'Success',
          pagination: result.pagination,
          meta: result.meta,
          data: result.data ? result.data : result,
        };
      }),
    );
  }
}
