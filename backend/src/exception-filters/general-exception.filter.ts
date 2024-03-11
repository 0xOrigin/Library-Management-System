import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  getExceptionResponse(exception: Error) {
    const message = exception.message;
    const error = exception.name;
    return { message, error };
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const { message, error } = this.getExceptionResponse(exception);

    response.status(statusCode).json({
      message,
      error,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
