import { Controller, Get, Inject, Post, Logger, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('processTweeT')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(Logger) private readonly logger: Logger) { }

  @Post()
  async processTweet(@Body() tweet: string): Promise<void> {
    this.logger.log(tweet)
    this.appService.processTweet(tweet);
  }
}
