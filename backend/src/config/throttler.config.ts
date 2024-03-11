import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerModuleOptions, ThrottlerOptionsFactory, seconds } from "@nestjs/throttler";
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import Redis from 'ioredis';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    constructor(private configService: ConfigService) { }
    
    createThrottlerOptions(): Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions {
        return {
            throttlers: [
                {
                    name: 'default',
                    ttl: seconds(this.configService.getOrThrow('THROTTLE_TTL') || 60),
                    limit: this.configService.getOrThrow('THROTTLE_LIMIT') || 10,
                },
            ],
            storage: new ThrottlerStorageRedisService(new Redis({
                host: this.configService.getOrThrow('REDIS_HOST') || 'localhost',
                port: +this.configService.getOrThrow('REDIS_PORT') || 6379,
                db: +this.configService.getOrThrow('REDIS_THROTTLE_DB') || 1,
                name: this.configService.getOrThrow('REDIS_NAME') || 'throttler',
            })),
            errorMessage: 'Too Many Requests',
        };
    }

}