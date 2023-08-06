# Start Application

Run `npm install`
Run `npm run start`

# APIs

Add Transaction
Url: http://localhost:3000/smart-contracts/value
Method: POST
Request Body: { "value": 123445 }

Get Transaction
Url: http://localhost:3000/smart-contracts/value
Method: GET

Websocket Event
Socket.io Url: ws://localhost:3000
Event Name: transactionAdded


# Possible Improvements, Design Decisions

1. I would add concept of user and add api keys for authenticating API requests. I would turn ws to wss and add authentication to it.
2. For guaranteed message delivery, I would have added acknowledgement step(similar to how message buses ensure message delivery). I would add event db model and save all events there. I would also have User model. I would have third table for UserEvents where we have eventId, userId, ack(boolean). Once user would receive websocket update, they would be required to send back ack message which would mark that event for user as sent. When user connects back, I would check all the messages that have not be acked for them and send him all the missing ones. 
    If we do not need to always keep the messages and make sure each one of them is delivered, we could store userevents that need acknowledgment in in-memory db like redis and would add expiry time to each record.
3. Currently we only implement and use 1 contract for getting and updating value. I have interfaced connection client and smart contract details, so its easy to initalize new contracts with same functionality for set/get. We could store different configs in db or even different configs for each user and after we authenticate each request, we can decide which ABI/address to use.
4. In case if different smart contracts which do similar job but have different method names for getting and setting value, similar to how I interfaced web3, we could create factory interface for contract functions which would implement general interface of setting/getting and then we would have separate service for each of smart contracts to accomodate to their implementation.
5. In point 2 I mention how to deal with delivery issue from us to the client that connects to our websocket server. As for connection between us and the blockchain itself(which is done through Infura WS in my implementation) there are 2 solutions I can think of:
    a. Since we keep track of events, if connection goes off and we reconnect, we could check events from last block to latest and import all the differences.
    b. Currently our smart contract lets anyone set/get value directly on contract. If we add constructor to set the admin address of owner(us, since that address will be set at the time of deployment), and then set restriction that only owner can update value, this would ensure that only through our API updates would be made. And once update is made we would broadcast changes from the same method(I have it commented currently). This way we would not miss any updates/events associated to our contract.
6. Enable Redis Adapter so that once we have multiple servers on production, socket.io connections would be shared in between servers.
7. I implemented solution with socket.io which is not native websocket for few reasons:
    a. Its feature rich. It already includes functionality like rooms, reconnection, namespaces, connection sharing between multiple servers(redis adapter), it also supports transition to webtransport(new protocol which solves same problems as websocket but in more performant manner). Also browser support is better too, since if websocket can not be used with that browser, it will use long polling instead. It also has great analytics dashboard and on top of it NestJS supports it by default.
8. I would write out all unit tests mainly for services and would mock any function that calls third party API(any blockchain communication).
9. I would add validation on POST request and save request body of it in dto folder, in appropriate dto file.
10. I would dockerize app and databases using docker-compose for local development.
