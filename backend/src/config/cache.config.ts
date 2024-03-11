import { ConfigService } from "@nestjs/config";
import { CacheModuleOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import { redisStore } from 'cache-manager-redis-yet';
import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    constructor(private configService: ConfigService) { }

    async createCacheOptions(): Promise<CacheModuleOptions> {
        return {
            store: await redisStore({
                socket: {
                    host: this.configService.getOrThrow('REDIS_HOST') || 'localhost',
                    port: +this.configService.getOrThrow('REDIS_PORT') || 6379,
                },
                ttl: +this.configService.getOrThrow('REDIS_TTL') || 0,
                database: +this.configService.getOrThrow('REDIS_CACHE_DB') || 0,
                name: this.configService.getOrThrow('REDIS_NAME') || 'cache',
            }),
            ttl: +this.configService.getOrThrow('REDIS_TTL') || 0,
            max: +this.configService.getOrThrow('REDIS_MAX') || 0,
        };
    }

}
