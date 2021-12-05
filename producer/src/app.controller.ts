import { Controller, Get, Post, Logger, Inject,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Tweet } from './utils'

@Controller('tweet')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(Logger) private readonly logger: Logger) {

  }


  @Post()
  async addTweet(@Body() tweet: Tweet): Promise<String> {
    if (!tweet) {
      throw new Error(`No tweet`)
    }
    this.logger.log('Tweet', tweet)
    await this.appService.filterTweet(tweet)
    
    return (`Tweet accepted...`)
  }
}
