import {isFunction} from 'lodash'

import {Bud} from '../../Bud'
import {config} from '../../config'
import {factory} from '../../factory'
import CLIConfig from '../Config'

/**
 * @internal
 */
export class Runner {
  /**
   * @internal
   */
  public _fluentBuilders: string[]

  /**
   * @internal
   */
  public _fluentBuildersByEnv: string[]

  /**
   * @internal
   */
  public _staticBuilders: string[]

  /**
   * @internal
   */
  public _staticBuildersByEnv: string[]

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
  public cli: {
    flags: {[key: string]: any}
    args: any[]
  }

  /**
   * Requested {@link Bud.mode}
   */
  public mode: 'development' | 'production'

  /**
   * Fluent builders
   *
   * @example `bud.config.{js,ts}`
   */
  public get fluentBuilders(): string[] {
    return this._fluentBuilders
  }
  public set fluentBuilders(builders: string[]) {
    this._fluentBuilders = builders
  }

  /**
   * Fluent builders by env
   *
   * @example `bud.development.{js,ts}`
   */
  public get fluentBuildersByEnv(): string[] {
    return this._fluentBuildersByEnv
  }
  public set fluentBuildersByEnv(builders: string[]) {
    this._fluentBuildersByEnv = builders
  }

  /**
   * Static builders
   *
   * @example `bud.config.{json,yml}`
   */
  public get staticBuilders(): string[] {
    return this._staticBuilders
  }
  public set staticBuilders(builders: string[]) {
    this._staticBuilders = builders
  }

  /**
   * Static builders by env
   *
   * @example `bud.development.{json,yml}`
   */
  public get staticBuildersByEnv(): string[] {
    return this._staticBuildersByEnv
  }
  public set staticBuildersByEnv(builders: string[]) {
    this._staticBuildersByEnv = builders
  }

  /**
   * Class constructor
   *
   * @param cli - CLI state
   * @param options - Bud options
   * @param app - Instance of {@link Bud}
   */
  public constructor(
    cli: Runner['cli'],
    options: Runner['options'] = {},
    app: Bud = null,
  ) {
    Object.assign(this, {cli, options})
    this.setEnv(
      options?.mode || this.cli.flags.mode || 'production',
    )

    this.app =
      app ??
      factory({
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
        `${this.app.name}.config.ts`,
        `${this.app.name}.config.js`,
      ],
      fluentBuildersByEnv: [
        `${this.app.name}.${this.app.mode}.config.ts`,
        `${this.app.name}.${this.app.mode}.config.js`,
      ],
      staticBuilders: [
        `package.json`,
        `${this.app.name}.config.json`,
        `${this.app.name}.config.yaml`,
        `${this.app.name}.config.yml`,
      ],
      staticBuildersByEnv: [
        `${this.app.name}.${this.app.mode}.config.json`,
        `${this.app.name}.${this.app.mode}.config.yaml`,
        `${this.app.name}.${this.app.mode}.config.yml`,
      ],
    })

    this.doStatics = this.doStatics.bind(this)
    this.doBuilders = this.doBuilders.bind(this)
  }

  /**
   * Main process
   *
   * @param build - Boolean value indicating if compilation should occur
   */
  public async make(build = true) {
    /**
     * Handle automatic installation and/or registration of modules
     * at user request
     */
    this.cli.flags.install && this.app.project.peers.install()
    this.cli.flags.discover &&
      this.app.project.peers.registerDiscovered()

    /**
     * Configure bud instance with static configs.
     */
    await this.doStatics()
    /**
     * Configure bud instance with fluent configs.
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
       *
       * @example `$ bud build --target plugin`
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
   * Configures application instance
   *
   * @param configs - configuration files
   */
  public async build(configs: string[]): Promise<void> {
    const builder = await new CLIConfig(this.app, configs).get()
    isFunction(builder) && builder(this.app)
  }

  /**
   * Set process.env based on app mode
   *
   * @param env - {@link Bud.mode}
   */
  public setEnv(env: 'production' | 'development') {
    process.env.BABEL_ENV = env
    process.env.NODE_ENV = env
  }

  /**
   * Process dynamic configs
   */
  public async doBuilders() {
    await this.build(this.fluentBuilders)
    await this.build(this.fluentBuildersByEnv)
  }

  /**
   * Process static configs
   */
  public async doStatics() {
    await new CLIConfig(this.app, this.staticBuilders).apply()
    await new CLIConfig(
      this.app,
      this.staticBuildersByEnv,
    ).apply()
  }
}
