import { DynamicModule, Module } from '@nestjs/common';
import { createRedisClientProvider } from './redis.provider';

@Module({})
export class RedisModule {
  public static forRoot(): DynamicModule {
    const host = 'localhost'
    const port = parseInt(process.env.REDIS_PORT || '6379');
    const db = parseInt(process.env.REDIS_DB || '0');
    const provider = createRedisClientProvider({
      host,
      port,
    });
    return {
      module: RedisModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
