import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

import {config, Framework} from '../..'
import {Factory} from '../../Factory'
import {Config} from '../Config'

/**
 * @class Runner
 * @classdesc Runs bud build for {@link Command} classes
 *
 * @remarks
 * It makes sense to pull this out of any individual command class
 * because it is usable between all of them.
 *
 * It's kind of an overly long and complicated class, but at its
 * core it's a simple task of running the bud build.
 *
 * - Instantiate bud with a {@link Factory}
 * - Gather configs from project directory
 * - Process configs. Static config processing is delegated to {@link Config}.
 * - Call {@link Framework['run']}
 */
class Runner {
  /**
   * Application instance
   */
  public app: Framework

  /**
   * Constructor options
   */
  public options: {
    mode?: 'production' | 'development'
    config?: Partial<config>
  }

  /**
   * CLI state
   */
  public cli: {
    flags: {[key: string]: any}
    args: any[]
  }

  /**
   * Requested compiler mode
   */
  public mode: 'development' | 'production'

  /**
   * Fluent builders
   * @example `bud.config.{js,ts}`
   */
  public _fluentBuilders: string[]
  public get fluentBuilders(): string[] {
    return this._fluentBuilders
  }
  public set fluentBuilders(builders: string[]) {
    this._fluentBuilders = builders
  }

  /**
   * Fluent builders by env
   * @example `bud.development.{js,ts}`
   */
  public _fluentBuildersByEnv: string[]
  public get fluentBuildersByEnv(): string[] {
    return this._fluentBuildersByEnv
  }
  public set fluentBuildersByEnv(builders: string[]) {
    this._fluentBuildersByEnv = builders
  }

  /**
   * Static builders
   * @example `bud.config.{json,yml}`
   */
  public _staticBuilders: string[]
  public get staticBuilders(): string[] {
    return this._staticBuilders
  }
  public set staticBuilders(builders: string[]) {
    this._staticBuilders = builders
  }

  /**
   * Static builders by env
   * @example `bud.development.{json,yml}`
   */
  public _staticBuildersByEnv: string[]
  public get staticBuildersByEnv(): string[] {
    return this._staticBuildersByEnv
  }
  public set staticBuildersByEnv(builders: string[]) {
    this._staticBuildersByEnv = builders
  }

  /**
   * Class constructor
   *
   * @param cli
   * @param options
   * @param app
   */
  public constructor(
    cli: Runner['cli'],
    options: Runner['options'] = {},
    app: Framework = null,
  ) {
    Object.assign(this, {cli, options})
    this.setEnv(
      options?.mode || this.cli.flags.mode || 'production',
    )

    this.app =
      app ??
      Factory({
        mode: this.mode,
        ...options,
        config: {
          ...config,
          ...(options.config ?? {}),
          cli: this.cli.flags.cli ? false : true,
        },
      })

    Object.assign(this, {
      fluentBuilders: [
        `${this.app.name}.ts`,
        `${this.app.name}.js`,
        `${this.app.name}.config.ts`,
        `${this.app.name}.config.js`,
      ],
      fluentBuildersByEnv: [
        `${this.app.name}.${this.app.mode}.ts`,
        `${this.app.name}.${this.app.mode}.js`,
        `${this.app.name}.${this.app.mode}.config.ts`,
        `${this.app.name}.${this.app.mode}.config.js`,
      ],
      staticBuilders: [
        `${this.app.name}.json`,
        `${this.app.name}.yaml`,
        `${this.app.name}.yml`,
        `${this.app.name}.config.json`,
        `${this.app.name}.config.yaml`,
        `${this.app.name}.config.yml`,
      ],
      staticBuildersByEnv: [
        `${this.app.name}.${this.app.mode}.json`,
        `${this.app.name}.${this.app.mode}.yaml`,
        `${this.app.name}.${this.app.mode}.yml`,
        `${this.app.name}.${this.app.mode}.config.json`,
        `${this.app.name}.${this.app.mode}.config.yaml`,
        `${this.app.name}.${this.app.mode}.config.yml`,
      ],
    })
  }

  @bind
  public async make(build = true) {
    /**
     * Handles automatic installation and/or registration of modules
     */
    this.cli.flags.install && this.app.project.peers.install()
    this.cli.flags.discover &&
      this.app.project.peers.registerDiscovered()

    /**
     * Configure bud instance with static confs
     */
    await this.doStatics()
    /**
     * Configure bud instance with fluent confs
     */
    await this.doBuilders()

    /**
     * If we are full on running a build, we'll process the rest of the build
     * related flags/args
     */
    if (build) {
      /**
       * Handle --cache flag
       */
      if (this.cli.flags.cache) {
        this.app.persist()
        this.app.children.every((_name, child) =>
          child.persist(),
        )
      }

      /**
       * Handle --minimize flag
       */
      if (this.cli.flags.minimize) {
        this.app.minimize()
        this.app.children.every((_name, child) => {
          child.minimize()
        })
      }

      /**
       * Handle --target flag
       * @example `bud build --target plugin`
       */
      if (this.cli.flags.target.length > 0) {
        /**
         * Handle parent if applicable
         */
        !this.cli.flags.target.includes('bud') &&
          this.app.hooks.on('build/entry', false)
        /**
         * And children if applicable
         */
        this.app.children.getKeys().forEach(name => {
          !this.cli.flags.target.includes(name) &&
            this.app.children.remove(name)
        })
      }
    }

    return this.app
  }

  /**
   * Actually calls config fn and
   * configures application instance
   * @param configs
   */
  @bind
  public async build(configs: string[]): Promise<void> {
    const builder = await new Config(this.app, configs).get()
    isFunction(builder) && builder(this.app)
  }

  /**
   * Set process.env based on app mode
   */
  @bind
  public setEnv(env: 'production' | 'development') {
    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  @bind
  public async doBuilders() {
    await this.build(this.fluentBuilders)
    await this.build(this.fluentBuildersByEnv)
  }

  @bind
  public async doStatics() {
    await new Config(this.app, this.staticBuilders).apply()
    await new Config(this.app, this.staticBuildersByEnv).apply()
  }
}

export {Runner}
