import * as plugins from './smartuniverse.plugins';

import { Handler, Route, Server } from 'smartexpress';

import { UniverseManager } from './smartuniverse.classes.manager';
import { UniverseChannel } from './smartuniverse.classes.universechannel';
import { UniverseMessage } from './smartuniverse.classes.universemessage';
import { UniverseStore } from './smartuniverse.classes.universestore';

import * as paths from './smartuniverse.paths';

export interface ISmartUniverseConstructorOptions {
  messageExpiryInMilliseconds: number;
}

export interface IServerGetMessagesRequestBody {
  youngerThan: number;
}

export interface IServerPutMessageRequestBody {
  message: string;
  payload: any;
}

export class Universe {
  // subinstances
  public universeStore: UniverseStore;
  public universeManager: UniverseManager;

  // options
  private options: ISmartUniverseConstructorOptions;

  // Store version handling
  private universeVersionStore: string;
  private get universeVersion() {
    if (this.universeVersionStore) {
      return this.universeVersionStore;
    } else {
      const packageJson = plugins.smartfile.fs.toObjectSync(paths.packageJson);
      this.universeVersionStore = packageJson.version;
      return this.universeVersionStore;
    }
  }

  private smartexpressServer: plugins.smartexpress.Server;
  private smartsocket: plugins.smartsocket.Smartsocket;

  constructor(optionsArg: ISmartUniverseConstructorOptions) {
    this.options = optionsArg;
    this.universeStore = new UniverseStore(this.options.messageExpiryInMilliseconds);
    this.universeManager = new UniverseManager();
  }

  /**
   * initiates a server
   */
  public async initServer(portArg: number | string) {
    this.smartexpressServer = new plugins.smartexpress.Server({
      cors: true,
      defaultAnswer: `smartuniverse server ${this.universeVersion}`,
      forceSsl: false,
      port: portArg
    });

    // message handling
    // adds messages
    const addMessageHandler = new Handler('PUT', request => {
      const requestBody = request.body;
      this.universeStore.addMessage(requestBody.message, requestBody.payload);
      console.log(requestBody);
      return true;
    });

    // gets messages
    const readMessageHandler = new Handler('GET', request => {
      const done = plugins.smartq.defer<UniverseMessage[]>();
      const requestBody = request.body;
      const messageObservable = this.universeStore.readMessagesYoungerThan(requestBody.since);
      messageObservable.toArray().subscribe(universeMessageArrayArg => {
        done.resolve(universeMessageArrayArg);
      });
      return done.promise;
    });

    // create new Route for messages
    const messageRoute = new Route(this.smartexpressServer, 'message');
    messageRoute.addHandler(addMessageHandler);
    messageRoute.addHandler(readMessageHandler);

    const leaderElectionRoute = new Route(this.smartexpressServer, 'leadelection');
    // TODO: implement Handlers for leader election

    // add websocket upgrade
    this.smartsocket = new plugins.smartsocket.Smartsocket({
      port: 12345 // fix this within smartsocket
    });

    this.smartsocket.setExternalServer('express', this.smartexpressServer as any); // should work with express as well
    this.smartsocket.start();

    await this.smartexpressServer.start();
  }

  public async stopServer() {
    await this.smartsocket.stop();
    await this.smartexpressServer.stop();
  }
}
