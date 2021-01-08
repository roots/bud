import {Service} from '@roots/bud-support'
import type {Framework, Server} from '@roots/bud-typings'

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
export default abstract class extends Service<Framework> {
  public _instance: Server.Instance
  public _running: boolean

  public get instance(): Server.Instance {
    return this._instance
  }

  public set instance(server: Server.Instance) {
    this._instance = server
  }

  public get running(): boolean {
    return this._running
  }

  public set running(running: boolean) {
    this._running = running
  }

  public get config(): Framework.Container<Framework.Server.Options> {
    return this.app.makeContainer(this.app.store.get('server'))
  }
}
