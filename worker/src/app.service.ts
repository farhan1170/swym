import { Inject, Injectable } from '@nestjs/common';
import { CountProcessor } from './countProcessor'
import { LocationProcessor } from './locationProcessor'
import { } from './utils'
@Injectable()
export class AppService {
  constructor(
    @Inject(CountProcessor) private readonly countProcessor: CountProcessor,
    @Inject(LocationProcessor) private readonly locationProcessor: LocationProcessor) {

  }
  processTweet(tweet): void {
    this.countProcessor.counter(tweet)
    this.locationProcessor.printLocation(tweet)
  }

}
