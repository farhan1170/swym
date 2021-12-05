import { Injectable, Logger,Inject } from '@nestjs/common';
const axios = require('axios');
@Injectable()
export class AppService {
  constructor(@Inject (Logger) private readonly logger: Logger){
    
  }
  async filterTweet(tweetObj): Promise<void> {
    if (!tweetObj.user_name || !tweetObj.location || !tweetObj.text) {
      throw new Error(`Some issue with tweet`)
    };
    try {
      const res = await axios.post('http://localhost:3002/processTweet', tweetObj);
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
    } catch (err) {
      this.logger.log(`Problem in service`)
    }
  }
}






