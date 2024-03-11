import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { RedisClientOptions } from 'redis';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthMiddleware } from './middlewares';
import { PostgresConfigService } from './databases';
import {
  GeneralExceptionFilter,
  HttpExceptionFilter,
  TypeORMExceptionFilter,
} from './exception-filters';
import { AdminSeeder } from './databases/seeders';
import { RolesGuard } from './guards';
import * as appConfig from './config';
import * as constants from './config/constants';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: appConfig.ServeStaticConfigService,
    }),
    JwtModule.register({
      global: true,
      secret: constants.JWT_SECRET,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: appConfig.CacheConfigService,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: appConfig.ThrottlerConfigService,
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useClass: PostgresConfigService,
    }),
    I18nModule.forRoot({
      ...appConfig.i18nConfig,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      scope: Scope.DEFAULT,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      scope: Scope.DEFAULT,
      useClass: GeneralExceptionFilter,
    },
    {
      provide: APP_FILTER,
      scope: Scope.DEFAULT,
      useClass: TypeORMExceptionFilter,
    },
    {
      provide: APP_FILTER,
      scope: Scope.DEFAULT,
      useClass: HttpExceptionFilter,
    },
    AdminSeeder,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'v1/auth/login',
          method: RequestMethod.POST,
        },
        {
          path: 'v1/auth/logout',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
