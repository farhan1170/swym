import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountProcessor } from './countProcessor'
import { LocationProcessor } from './locationProcessor'
import { RedisModule } from '../libs/redis/src'

@Module({
  imports: [
    RedisModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, LocationProcessor, CountProcessor, Logger],
})
export class AppModule { }
