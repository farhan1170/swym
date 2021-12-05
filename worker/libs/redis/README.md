# REDIS
This is a common implementation for redis client. It's a wrapper over the `Redis`. This wrapper will handle the redis client options, based on the common enviroment variables and promised based wrapper over existing function.

# USAGE

Import as singleton redis client module.

```ts
import { Module } from '@nestjs/common';
import { RedisModule } from "@pidge/database/redis";

@Module({
    imports: [
        RedisModule.forRoot()
    ]
})
export class AppModule{}

```

Then simply inject the Redis:

```ts
import { Controller, Inject } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from '@pidge/database/redis';

@Controller('user')
export class UsersController {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClient) { }
}
```


## ENVIROMENT VARIABLES

```sh
# Host url of redis database. Default value 'localhost'.
REDIS_HOST:localhost

# Port of redis database. Default value '5432', i.e. postgres default port.
REDIS_PORT:3306

# Redis Databse to connect with
REDIS_DB:

# Redis password for auth
REDIS_PASSWORD
```