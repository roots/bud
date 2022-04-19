import {Bud} from '../bud'

export interface Constructor {
  new (app: Bud): void
}
export type Definition = Constructor

export abstract class Extension {
  [key: string]: any

  /**
   * @public
   */
  public abstract label: string

  /**
   * @public
   */
  public path: string

  /**
   * @public
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * @public
   */
  public logger?: Bud['logger']['instance']

  /**
   * @public
   */
  public constructor(_app?: Bud) {
    if (_app) this._app = () => _app
  }

  /**
   * @public
   */
  public async init() {
    this.path = await this.app.module.path(this.label)
  }

  /**
   * @public
   */
  public getOptions() {
    return this.app.extensions.get(this.label).options
  }

  /**
   * @public
   */
  public resolve(module: string) {
    return this.app.module.resolvePreferred(module, this.path)
  }

  /**
   * @public
   */
  public async import(module: string) {
    try {
      return await import(this.resolve(module))
    } catch (error) {
      this.app.error(error)
    }
  }
}

export {Bud} from '../bud'
export {Module, PluginInstance} from './module'
export {Plugin} from './plugin'
