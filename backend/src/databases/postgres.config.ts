import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.getOrThrow('POSTGRES_HOST') || 'localhost',
            port: +this.configService.getOrThrow('POSTGRES_PORT') || 5432,
            username: this.configService.getOrThrow('POSTGRES_USER') || 'postgres',
            password: this.configService.getOrThrow('POSTGRES_PASSWORD') || 'postgres',
            database: this.configService.getOrThrow('POSTGRES_DB') || 'postgres',
            synchronize: this.configService.getOrThrow('POSTGRES_SYNCHRONIZE') === 'true' || false,
            ssl: this.configService.getOrThrow('POSTGRES_SSL') === 'true' || false,
            cache: {
                type: 'ioredis',
                options: {
                    host: this.configService.getOrThrow('REDIS_HOST') || 'localhost',
                    port: +this.configService.getOrThrow('REDIS_PORT') || 6379,
                    db: +this.configService.getOrThrow('REDIS_CACHE_DB') || 0,
                    keyPrefix: this.configService.getOrThrow('REDIS_KEY_PREFIX') || '',
                },
            },
            logging: this.configService.getOrThrow('POSTGRES_LOGGING') === 'true' || false,
            useUTC: true,
            entities: [__dirname + '/../modules/**/models/*.model{.ts,.js}'],
            migrationsTableName: 'migration',
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            isolateWhereStatements: true,
            autoLoadEntities: true,
        };
    }
}
