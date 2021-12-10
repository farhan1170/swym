import { Tweet } from './utils'
import { Logger, Inject } from '@nestjs/common';
export class LocationProcessor {
  constructor(@Inject(Logger) private readonly logger: Logger) {

  }
  printLocation(tweetObj: Tweet): void {
    this.logger.log(`Location of tweet is ${tweetObj.location}`)
  }
  getTemp(newT: Tweet): number {
    return 10
  }

}