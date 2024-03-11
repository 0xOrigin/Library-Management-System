import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const now = new Date().toUTCString();
    return next.handle().pipe(
      tap((data) => {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent');
        const { statusCode } = response;
        const contentLength = response.get('content-length') ?? data?.length;
        this.logger.log(
          `${ip} - ${now} - "${method} ${originalUrl}" ${statusCode} ${contentLength} - ${userAgent}`,
        );
      }),
    );
  }
}
