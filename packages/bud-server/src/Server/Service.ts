import {Service} from '@roots/bud-support'
import type {
  Container,
  Framework,
  Server,
} from '@roots/bud-typings'

/**
 * ## Server service provider.
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 */
export default abstract class
  extends Service<Framework>
  implements Server {
  /**
   * Express application instance.
   */
  public _instance: Server.Instance

  /**
   * Express application instance getter
   */
  public get instance(): Server.Instance {
    return this._instance
  }

  /**
   * Express application instance setter
   */
  public set instance(server: Server.Instance) {
    this._instance = server
  }

  /**
   * Server config getter
   */
  public get config(): Container {
    return this.app.serverConfig
  }

  /**
   * Server config setter
   */
  public set config(serverConfig: Container) {
    this.app.serverConfig.setStore(serverConfig)
  }

  /**
   * Run server
   */
  public abstract run(): this

  /**
   * Listen to server connection
   */
  public abstract listen(): void
}
