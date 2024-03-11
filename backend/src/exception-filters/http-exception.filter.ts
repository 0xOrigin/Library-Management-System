import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  getExceptionResponse(exception: HttpException) {
    const exceptionResponse = exception.getResponse() as Record<string, any>;
    const message = exceptionResponse.message || exception.message;
    const error =
      exceptionResponse.error || exception.name.replace('Exception', '');
    const statusCode = exceptionResponse.statusCode || exception.getStatus();
    return { message, error, statusCode };
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { message, error, statusCode } = this.getExceptionResponse(exception);

    response.status(statusCode).json({
      message,
      error,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
