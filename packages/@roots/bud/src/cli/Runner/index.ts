import {bind} from '@roots/bud-support'

import {Bud} from '../../Bud'
import {config} from '../../config'
import {factory} from '../../factory'
import * as dynamic from './dynamic.config'
import * as flags from './flags.config'
import * as manifest from './manifest.config'

/**
 * @internal
 */
export class Runner {
  /**
   * {@link Bud} application instance
   */
  public app: Bud

  /**
   * Constructor options
   */
  public options: {
    mode?: 'production' | 'development'
    config?: Partial<typeof config>
  }

  /**
   * CLI state
   */
  public flags: {[key: string]: any}
  public args: {[key: string]: any}

  /**
   * Requested {@link Bud.mode}
   */
  public mode: 'development' | 'production'

  public cli: {
    args: Record<string, any>
    argv: Array<string>
    flags: Record<string, any>
    raw: Array<Record<string, string>>
    metadata: Record<string, Record<string, any>>
  }

  /**
   * Class constructor
   *
   * @param cli - CLI state
   * @param options - Bud options
   * @param app - Instance of {@link Bud}
   */
  public constructor(
    cli: {
      args: Record<string, any>
      argv: Array<string>
      flags: Record<string, any>
      raw: Array<Record<string, string>>
      metadata: Record<string, Record<string, any>>
    },
    options: Runner['options'] = {},
  ) {
    Object.assign(this, {...cli})
    options && Object.assign(this, options)
  }

  /**
   * Initialize bud application
   *
   * @public
   */
  public async initialize() {
    this.app = await factory({
      mode: this.mode,
      ...this.options,
      config: {
        ...config,
        ci: this.flags?.ci ?? false,
        cache: this.flags?.cache !== 'false',
        clean: this.flags?.clean !== 'false',
        ...(this.options?.config ?? {}),
      },
    })
  }

  /**
   * Main process
   *
   * @param build - Boolean value indicating if compilation should occur
   */
  @bind
  public async make() {
    await this.app.extensions.registerExtensions()
    await this.app.extensions.bootExtensions()
    await dynamic.config(this.app)
    await manifest.config(this.app)
    await flags.config(this.app, this.flags)

    return this.app
  }
}
