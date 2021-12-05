import { Tweet } from './utils'
import { Logger, Inject } from '@nestjs/common';
import { RedisClient, REDIS_CLIENT } from '../libs/redis/src'

export class CountProcessor {

  constructor(@Inject(Logger) private readonly logger: Logger,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient) {

  }
  async counter(tweetObj: Tweet): Promise<void> {
    let data = await this.redisClient.get(tweetObj.user_name)
    
    let count: number
    if (!data) {
      count = 1
      await this.redisClient.set(tweetObj.user_name, count)
    } else {
      if (Number(data)) {
        count = 1 + Number(data)
        await this.redisClient.set(tweetObj.user_name, count)
      }
    }
    let constraint = this.redisClient.get(`constraint`)
    if (!constraint || !Number(constraint)) {
      constraint = 1000
    }
    if (count >= constraint) {
      this.logger.log(`Condition of ${constraint} is met by${tweetObj.user_name}`)
    }

  }
}