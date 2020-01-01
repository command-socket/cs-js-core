# CommandSocket - JS Core
A command-based WebSocket communication framework written in TypeScript/JavaScript.

##### A note about development progress...
The CommandSocket framework is functional, but nevertheless still in its infancy. While the basic functionality should work as documented, bugs are still likely.

### [Find @command-socket/core on NPM.](https://www.npmjs.com/package/@command-socket/core)

## Table of Contents
 - [Installation](#installation)
 - [Related Packages](#related-packages)
 - [Basic Usage](#basic-usage)
 - [Documentation](#documentation)
 - [License](#license)

## Installation
Install from NPM with
```
$ npm install --save @command-socket/core
```

## Related Packages
There are three other TypeScript/JavaScript CommandSocket packages that you are most likely looking for:

1. CommandSocket Server [[GitHub]](https://github.com/command-socket/cs-js-server) [[NPM]](https://www.npmjs.com/package/@command-socket/server)
    - A centralized server which can spin up individual CommandSockets in connection with any number of clients.
    
2. CommandSocket Browser Client [[GitHub]](https://github.com/command-socket/cs-js-browser-client) [[NPM]](https://www.npmjs.com/package/@command-socket/browser-client)
    - A CommandSocket client that can be used in the browser.
    
3. CommandSocket Node Client [[GitHub]](https://github.com/command-socket/cs-js-node-client) [[NPM]](https://www.npmjs.com/package/@command-socket/node-client)
    - A CommandSocket client that can be used in a NodeJS environment.
    
Each of these packages provides a specific part of the total framework of the CommandSocket system.

## Basic Usage
Begin by spinning up a CommandSocket server (see [_Related Packages_](#related-packages) if you are unsure where to find this).
```typescript
// ### SERVER SIDE ### //

import { CommandSocketServer } from "@command-socket/server";

let serverPort: number = 3849;
let server: CommandSocketServer = new CommandSocketServer(serverPort);
```

Then, in your choice of environment, create a client and point it to the location of the server that you've just started. Don't worry about which environment you're starting the client in (browser or NodeJS), both implementations expose the exact same functionality.
```typescript
// ### CLIENT SIDE ### //

import { CommandSocket } from "@command-socket/browser-client";
// OR
import { CommandSocket } from "@command-socket/node-client";

const serverPort: number = 3849;
const serverIP: string = "4.3.2.1";
const wsAddress: string = "ws://" + serverIP + ":" + serverPort;

let client: CommandSocket = new CommandSocket(wsAddress);
```

And voilà! You have a connected server-client pair!

The client also exposes `on open` and `on close` events, so you can perform any desired action when such an event occurs, for example: logging it to the console.
```typescript
// ### CLIENT SIDE ### //

client.getEvents().OPEN.subscribe(() => console.log("Socket successfully connected!"));
client.getEvents().CLOSE.subscribe(() => console.log("Socket closed."));
```

Now that you have this connected pair, you can invoke a command on the server from the client. In this example, we'll use one of the built-in commands that comes packaged with the CommandSocket framework.

```typescript
// ### CLIENT SIDE ### //
import { CommandSocketIdentity } from "@command-socket/core";

let identity: CommandSocketIdentity = await client.invoke("commandsocket identify");

console.log("Connected Socket IP: " + identity.ip);
console.log("Connected Socket ID: " + identity.id);

// If the above `client.invoke(...) call causes an compile error within
// TypeScript, you may have to specify 'undefined' as the second argument.
// This is due to the way that the type-checking system requires a value
// to be passed even though the parameter's type is 'void'.
```

Note that it is also just as easy to invoke a command on the client from the server!

After all is said and done, remember to close the server when you are done with it.

```typescript
// ### SERVER SIDE ### //

server.close();
```

## Documentation
See the [wiki](https://github.com/command-socket/cs-js-core/wiki) for full documentation.

## License
@command-socket/core is made available under the GNU General Public License v3.

Copyright (C) 2019 Trevor Sears
