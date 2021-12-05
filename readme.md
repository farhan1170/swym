we are using redis as data store to number of tweets by user_name
intall redis
start redis-cli
set constraint 1000 (You can set any number)

go to producer directory
run 
npm install
npm run start:dev

go to worker directory
run 
npm install
npm run start:dev

run this curl to see outputs
curl --location --request POST 'localhost:3001/tweet' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_name": "far",
    "location": "bsp",
    "text": "HI"
}'

result will be visible in log of worker

the project is designed in 2 parts
producer
worker

both producer and worker has src directory

producer accepts the message
worker processes the message

producer has app
app.module.ts module is defined and dependencies are injected (all helpers and logger are injected)
app.controller.ts accepts request
app.services.ts file filters the request and send request to worker
main.ts is starting point

producer has app
app.module.ts module is defined and dependencies are injected (all helpers , logger, redis are injected)
app.controller.ts accepts request which is sent by producer
app.services.ts file sends request to location
redis connection is made in libs/src
locationProcessor.ts has location feature
countProcessor.ts has user's tweet counting logic
main.ts is starting point

in design we have covered separation of concern, dependency injection

improvemnts needed
-api gateway should be there to accept http requst before procucer
-all the requests must have token in header
-api gateway then shoud send request to auth service so that user session can be appended to the message and appropriate service can be determined
-request is then forwarded to  producer which can also be load balanced
-producer should push received tweet to message broker
-we can have multiple workers picking events from queue and updating count and do location processing
-unit test should be written