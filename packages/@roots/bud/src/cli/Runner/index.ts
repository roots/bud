import {Configuration} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {isUndefined} from 'lodash'

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
  public constructor(public cli: Configuration['cli']) {}

  /**
   * Initialize bud application
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async initialize() {
    const determineDefaultValue = (value, fallback = true) =>
      isUndefined(value) ? fallback : value === true

    this.app = await factory({
      ...config,
      mode: this.cli.flags.mode,
      config: {
        ...config,
        mode: this.cli.flags.mode,
        cli: this.cli,
        features: {
          ...(config.features ?? {}),
          cache: determineDefaultValue(this.cli.flags.cache),
          clean: determineDefaultValue(this.cli?.flags?.clean),
          dashboard: determineDefaultValue(
            this.cli?.flags?.dashboard,
          ),
          hash: determineDefaultValue(
            this.cli?.flags?.hash,
            false,
          ),
          html: determineDefaultValue(
            this.cli?.flags?.html,
            false,
          ),
          install: determineDefaultValue(
            this.cli?.flags?.install,
            false,
          ),
          inject: determineDefaultValue(this.cli?.flags?.inject),
          log: determineDefaultValue(
            this.cli?.flags?.log,
            false,
          ),
          manifest: determineDefaultValue(
            this.cli?.flags?.manifest,
          ),
          splitChunks: determineDefaultValue(
            this.cli?.flags?.splitChunks,
            false,
          ),
        },
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
    try {
      await dynamic.configs(this.app)

      await manifest.configs(this.app, 'configs.json.global')
      await manifest.configs(
        this.app,
        'configs.json.conditional',
      )
    } catch (error) {
      this.app.error(error)
    }

    await flags.config(this.app, this.cli.flags)

    return this.app
  }
}
