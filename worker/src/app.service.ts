import { Inject, Injectable, Logger } from '@nestjs/common';
import { CountProcessor } from './countProcessor'
import { LocationProcessor } from './locationProcessor'
import { } from './utils'
@Injectable()
export class AppService {
  private observerList = [{
    key: 'count', message: `"Yay you have made $x tweets"`, value: 1, condition: `>=`
  }, {
    key: 'count', message: `Yay you won a prize`, value: 2, condition: `>=`
  },
  {
    key: 'location', message: `$x tweet from city`, value: 'delhi', condition: '=='
  },
  {
    key: 'location', message: `temp of city is $x`, value: 'mumbai', condition: '==', external_service: 'getTemp'
  }]
  constructor(
    @Inject(CountProcessor) private readonly countProcessor: CountProcessor,
    @Inject(LocationProcessor) private readonly locationProcessor: LocationProcessor,
    @Inject(Logger) private readonly logger: Logger) {

  }
  async processTweet(tweet): Promise<void> {
    let newT = { ...tweet }
    Object.keys(newT).map(key => {
      if (typeof newT[key] === 'string') {
        newT[key] = newT[key].toLowerCase()
      }
    })
    newT.count = await this.countProcessor.getCount(newT)
    for (let i = 0; i < this.observerList.length; i++) {
      let serviceData
      //this.logger.log(newT)
      let item = this.observerList[i]
      //this.logger.log(item)
      if (item.external_service) {
        serviceData = this.locationProcessor[item.external_service](item.value)
      }
      if (item.condition == '>=' && newT[item.key] >= item.value.toString()) {
        //this.logger.log('=========',item.message)
        item.message = item.message.replace('$x', item.value.toString())
        this.logger.log(item.message)
      }
      if (item.condition == '<=' && newT[item.key] <= item.value) {
        this.logger.log(item.message.replace('$x', item.value.toString()))
      }
      if (item.condition == '==' && newT[item.key] == item.value && !item.external_service) {

        this.logger.log(item.message.replace('$x', item.value.toString()))
      }
      if (item.condition == '==' && newT[item.key] == item.value && item.external_service) {

        this.logger.log(item.message.replace('$x', serviceData.toString()))
      }

    }
  }


}
