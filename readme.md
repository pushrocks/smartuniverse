# @pushrocks/smartuniverse
messaging service for micro services

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartuniverse)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartuniverse)
* [github.com (source mirror)](https://github.com/pushrocks/smartuniverse)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartuniverse/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartuniverse/badges/master/build.svg)](https://gitlab.com/pushrocks/smartuniverse/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartuniverse/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartuniverse/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartuniverse.svg)](https://www.npmjs.com/package/@pushrocks/smartuniverse)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartuniverse/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartuniverse)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

### What is smartuniverse all about?

Think WhatsApp, but for your microservices architecture. It allows your services to securely talk to each other in **private, shielded channels** without having to expose anything to the outside world. This allows the use of **reactive programming across your entire stack**.

### Server side

every universe has a server that manages messages.  
Think Kafka, but without Kafka.

```typescript
import * as smartuniverse from '@pushrocks/smartuniverse';

const myUniverse = new smartuniverse.Universe({
  messageExpiryInMilliseconds: 60000 // the standard time in milliseconds until a message expires
});

// create as many channels as you like
myUniverse.addChannel('awesomeChannel', 'awesomeChannelPass');
myUniverse.addChannel('awesomeChannel2', 'jhkjhfsdf87eerkjslkfja9');

myUniverse.start(8765); // start the server and provide the port on which to listen on
```

### Client side

All your microservices represents clients in the universe that may talk to each other using the universe server.

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
