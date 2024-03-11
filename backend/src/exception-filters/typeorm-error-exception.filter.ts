import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';

export type TypeORMErrorWithDetail = TypeORMError & Record<'detail', string>;

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  getExceptionResponse(exception: TypeORMErrorWithDetail) {
    const message = exception.detail ?? exception.message;
    const error = exception.name;
    return { message, error };
  }

  catch(exception: TypeORMErrorWithDetail, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.BAD_REQUEST;
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
