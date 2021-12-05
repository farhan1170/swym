import { Provider } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

export function createRedisClientProvider(
  options: Redis.RedisOptions,
): Provider {
  const redisClient = new Redis({
    ...options,
    enableAutoPipelining: true,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  return {
    provide: REDIS_CLIENT,
    useValue: redisClient,
  };
}
