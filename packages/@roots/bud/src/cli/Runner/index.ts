import {Configuration} from '@roots/bud-framework'
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
   * @public
   */
  public app: Bud

  /**
   * Class constructor
   *
   * @param cli - CLI state
   * @param options - Bud options
   */
  public constructor(
    public cli: Configuration['cli'],
    public options: {
      mode?: 'production' | 'development'
      config?: Partial<typeof config>
    } = {
      mode: 'production',
      config: {},
    },
  ) {}

  /**
   * Initialize bud application
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async initialize() {
    this.app = await factory({
      mode: this.options.mode,
      ...this.options,
      config: {
        ...config,
        ci: this.cli?.flags?.ci,
        cache: this.cli?.flags?.cache,
        clean: this.cli?.flags?.clean,
        inject: this.cli?.flags?.inject,
        cli: this.cli,
        ...(this.options?.config ?? {}),
      },
    })

    return this.app
  }

  /**
   * Main process
   *
   * @param build - Boolean value indicating if compilation should occur
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make() {
    await dynamic.config(this.app)

    await manifest.config(this.app, 'configs.json.global.config')

    await manifest.config(
      this.app,
      'configs.json.conditional.config',
    )

    await flags.config(this.app, this.cli.flags)

    return this.app
  }
}
