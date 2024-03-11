import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmat from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { corsConfig } from './config';
import { AdminSeeder } from './databases/seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const adminSeeder = app.get(AdminSeeder);
  await adminSeeder.seed();

  app.enableCors(corsConfig(configService));
  app.use(helmat());
  app.use(compression());
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      transform: true,
      skipMissingProperties: false,
      stopAtFirstError: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
    }),
  );

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port, () => {
    Logger.log(
      `Running API in [${process.env.NODE_ENV}] mode on Port [${port}]`,
      'Bootstrap',
    );
  });
}
bootstrap();
