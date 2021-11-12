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
    const determineDefaultBool = (value, fallback = true) =>
      isUndefined(value) ? fallback : value === true

    const settings = {
      config: {
        cli: this.cli,
        mode: this.cli.flags.mode ?? 'production',
        location: {
          project:
            this.cli.flags['location.project'] ??
            config.location.project,
          src:
            this.cli.flags['location.src'] ??
            config.location.src,
          dist:
            this.cli.flags['location.dist'] ??
            config.location.dist,
          storage:
            this.cli.flags['location.storage'] ??
            config.location.storage,
        },
        cache: {
          type:
            this.cli.flags['cache.type'] ?? config.cache.type,
        },
        features: {
          cache: determineDefaultBool(this.cli.flags.cache),
          clean: determineDefaultBool(this.cli?.flags.clean),
          dashboard: determineDefaultBool(
            this.cli.flags.dashboard,
          ),
          hash: determineDefaultBool(this.cli.flags.hash, false),
          html: determineDefaultBool(this.cli.flags.html, false),
          inject: determineDefaultBool(this.cli.flags.inject),
          install: determineDefaultBool(
            this.cli.flags.install,
            false,
          ),
          log: determineDefaultBool(this.cli.flags.log, false),
          manifest: determineDefaultBool(
            this.cli.flags.manifest,
          ),
          splitChunks: determineDefaultBool(
            this.cli.flags.splitChunks,
            false,
          ),
        },
      },
    }

    this.app = await factory(settings)

    this.app.dump(settings, {prefix: 'cli settings'})

    this.app.logger.instance
      .scope('cli', 'runner')
      .success('framework pre-compilation lifecycle complete.')

    this.app.dump(
      this.app,
      {
        prefix: 'bud post lifecycle',
        printFunctionName: true,
        language: 'typescript',
        callToJSON: false,
      },
      3,
    )

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
