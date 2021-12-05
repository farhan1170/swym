import { Redis } from 'ioredis';

export { REDIS_CLIENT } from './redis.constants';
export { RedisModule } from './redis.module';
export type RedisClient = Redis;
