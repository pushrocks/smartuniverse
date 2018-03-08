import * as plugins from './smartuniverse.plugins';

import { Handler, Route, Server } from 'smartexpress';

import * as paths from './smartuniverse.paths';

export interface ISmartUniverseConstructorOptions {
  port: number | string;
}

export class SmartUniverse {
  private options: ISmartUniverseConstructorOptions;
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
  constructor(optionsArg: ISmartUniverseConstructorOptions) {
    this.options = optionsArg;
  }

  public async init() {
    this.smartexpressServer = new plugins.smartexpress.Server({
      cors: true,
      defaultAnswer: `smartuniverse server ${this.universeVersion}`,
      forceSsl: false,
      port: this.options.port
    });

    const addRoute = new Route(this.smartexpressServer, 'addMessage');
    const addHandler = new Handler('PUT', requestBody => {
      return 'hi';
    });
    // await this.smartexpressServer.addRoute()
  }
}
