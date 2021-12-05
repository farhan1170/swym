import { Injectable, Logger, Inject } from '@nestjs/common';
const axios = require('axios');
@Injectable()
export class AppService {
  constructor(@Inject(Logger) private readonly logger: Logger) {

  }
  async filterTweet(tweetObj): Promise<void> {
    if (!tweetObj.user_name || !tweetObj.location || !tweetObj.text ||
      !tweetObj.user_name.length || !tweetObj.location.length || !tweetObj.text.length) {
      throw new Error(`Some issue with tweet`)
    };
    try {
      const res = await axios.post('http://localhost:3002/processTweet', tweetObj);

    } catch (err) {
      this.logger.log(`Problem in service`)
      throw new Error(`Problem in service`)
    }
  }
}






