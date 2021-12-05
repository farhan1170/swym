import { Controller, Get, Post, Logger, Inject, Body, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }
    this.logger.log('Tweet', tweet)
    await this.appService.filterTweet(tweet).catch(e => {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    })

    return (`Tweet accepted...`)
  }
}
