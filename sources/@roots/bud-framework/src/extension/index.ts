import {lodash, Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Bud} from '../bud'
import {Modules} from '../registry'
import {PluginInstance} from './module'

export interface Constructor {
  new (app: Bud): void
}
export type Definition = Constructor

export class Extension<
  Options extends Record<string, any> = Record<string, any>,
  Plugin extends PluginInstance = null,
> {
  [key: string]: any

  /**
   * The module name
   *
   * @public
   */
  public label?: `${keyof Modules & string}`

  /**
   * Options registered to the extension module
   *
   * @public
   */
  public options?(app: Bud): Options

  /**
   * General purpose callback. Called first.
   *
   * @public
   */
  public register?(app?: Bud, logger?: Signale): Promise<unknown>

  /**
   * General purpose callback. Called after everything else.
   *
   * @public
   */
  public boot?(app?: Bud, logger?: Signale): Promise<unknown>

  /**
   * Boolean or a function returning a boolean indicating if the {@link Module} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Bud} instance as its first parameter and
   * a {@link Container} instance holding the {@link Module.options} (if any) as the second parameter.
   *
   * Do note that this is not the same parameter order as {@link Module.make}. That's because it is more common
   * to check the state of the {@link Bud} in the {@link Module.when} callback than the {@link Module.options}
   * (ie Checking the {@link Bud.isProduction} state).
   *
   * @public
   */
  public when?(app?: Bud, options?: Container<Options>): boolean

  /**
   * Either a function returning a plugin value or the plugin value itself.
   *
   * @public
   */
  public make?(
    options?: Container<Options>,
    app?: Bud,
    logger?: Signale,
  ): Plugin & {apply: Plugin['apply']}

  /**
   * Compiler plugin `apply` method
   *
   * @public
   */
  public apply?: Plugin['apply']

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

  public get<K extends string, T = any>(key: K) {
    return lodash.get(this, key) as T
  }

  public set<K extends string, T = any>(key: K, value: T) {
    lodash.set(this, key, value)
    return this
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
  public getOptions(): Container<Options> {
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
