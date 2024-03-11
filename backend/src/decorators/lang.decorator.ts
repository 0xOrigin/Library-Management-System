import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Lang = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const { headers } = ctx.switchToHttp().getRequest<Request>();
  let lang = headers['accept-language']?.toLowerCase();

  if (!(lang && ['en', 'ar'].includes(lang))) {
    lang = 'en';
  }
  
  return lang;
});
