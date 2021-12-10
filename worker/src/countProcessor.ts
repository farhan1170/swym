import { Tweet } from './utils'
import { Logger, Inject } from '@nestjs/common';
import { RedisClient, REDIS_CLIENT } from '../libs/redis/src'

export class CountProcessor {

  constructor(@Inject(Logger) private readonly logger: Logger,
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient) {

  }
  async counter(tweetObj: Tweet): Promise<void> {
    //serch user name in redis format is {user_name: tweet_count}
    let data = await this.redisClient.get(tweetObj.user_name)

    let count: number
    if (!data || !Number(data)) {
      count = 1
      await this.redisClient.set(tweetObj.user_name, count)
    } else {
      if (Number(data)) {
        count = 1 + Number(data)
        await this.redisClient.set(tweetObj.user_name, count)
      }
    }
    //get constraint from redis
    let constraint = this.redisClient.get(`constraint`)
    if (!constraint || !Number(constraint)) {
      constraint = 1000
    }
    if (count >= constraint) {
      this.logger.log(`Condition of ${constraint} is met by${tweetObj.user_name}`)
    }
    else {
      this.logger.log(`Condition of ${constraint} is NOT met by${tweetObj.user_name}`)
    }
  }
  async getCount(tweetObj: Tweet): Promise<number> {

    let data = await this.redisClient.get(tweetObj.user_name)
    //this.logger.log('---------------', data)
    if (!data || !Number(data)) {
      await this.redisClient.set(tweetObj.user_name, 1)
      return 1
    }
    else {
      await this.redisClient.set(tweetObj.user_name, Number(data) + 1)
      return Number(data) + 1
    }
  }
}