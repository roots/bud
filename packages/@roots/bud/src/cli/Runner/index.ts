import {bind} from '@roots/bud-support'

import {Bud} from '../../Bud'
import {config} from '../../config'
import {factory} from '../../factory'
import {isFunction} from '../cli.dependencies'
import CLIConfig from '../Config'

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
    await this.processDynamicConfigs()

    /**
     * Handle --src flag
     */
    if (typeof this.flags.src !== 'undefined') {
      this.app.setPath('src', this.flags.src)
      this.app.children.every((_name, child) =>
        child.setPath('src', this.flags.src),
      )
    }

    /**
     * Handle --dist flag
     */
    if (typeof this.flags.dist !== 'undefined') {
      this.app.setPath('dist', this.flags.dist)
      this.app.children.every((_name, child) =>
        child.setPath('dist', this.flags.dist),
      )
    }

    /**
     * Handle --publicPath flag
     */
    if (typeof this.flags.publicPath !== 'undefined') {
      this.app.setPublicPath(this.flags.publicPath)
      this.app.children.every((_name, child) =>
        child.setPublicPath(this.flags.publicPath),
      )
    }

    /**
     * Handle --cache flag
     */
    if (typeof this.flags.cache !== 'undefined') {
      this.app.persist(this.flags.cache)
      this.app.children.every((_name, child) =>
        child.persist(this.flags.cache),
      )
    }

    /**
     * Handle --devtool flag
     */
    if (typeof this.flags.devtool !== 'undefined') {
      this.app.devtool(this.flags.devtool)
      this.app.children.every((_name, child) =>
        child.devtool(this.flags.devtool),
      )
    }

    /**
     * Handle --devtool flag
     */
    if (typeof this.flags.hash !== 'undefined') {
      this.app.hash(this.flags.hash)
      this.app.children.every((_name, child) =>
        child.hash(this.flags.hash),
      )
    }

    /**
     * Handle --runtime flag
     */
    if (typeof this.flags.runtime !== 'undefined') {
      this.app.runtime(this.flags.runtime)
      this.app.children.every((_name, child) =>
        child.runtime(this.flags.runtime),
      )
    }

    /**
     * Handle --manifest flag
     */
    if (typeof this.flags.manifest !== 'undefined') {
      this.app.store.set('manifest', this.flags.manifest)
      this.app.children.every((_name, child) =>
        child.store.set('manifest', this.flags.manifest),
      )
    }

    /**
     * Handle --minimize flag
     */
    if (typeof this.flags.minimize !== 'undefined') {
      this.app.minimize(this.flags.minimize)
      this.app.children.every((_name, child) => {
        child.minimize(this.flags.minimize)
      })
    }

    /**
     * Handle --minimize flag
     */
    if (typeof this.flags.vendor !== 'undefined') {
      this.app.splitChunks(this.flags.vendor)
      this.app.children.every((_name, child) => {
        child.splitChunks(this.flags.vendor)
      })
    }

    /**
     * Handle --target flag
     *
     * @example `$ bud build --target plugin`
     */
    if (this.flags.target.length > 0) {
      /**
       * Handle parent if applicable
       */
      !this.flags?.target?.includes('bud') &&
        this.app.hooks.on('build/entry', false)

      /**
       * And children if applicable
       */
      this.app.children.getKeys().forEach(name => {
        !this.flags?.target?.includes(name) &&
          this.app.children.remove(name)
      })
    }

    return this.app
  }

  @bind
  public async processDynamicConfigs() {
    const {path} = this.app.project.get(
      'configs.dynamic.global',
    )[0]

    this.app.await(`tapping ${path}`)

    const fn = await import(path)

    this.app.tap(fn)
  }

  @bind
  public async processStaticConfig(configKey: string) {
    const builder = new CLIConfig(
      this.app,
      this.app.project.get(configKey),
    )

    const res = await builder.get()

    if (res === null) {
      this.app.info('no static config to process')
      return
    }

    Object.entries(config).forEach(([c, v]) => {
      this.app.log(`parsed compiler ${c}`)

      Object.entries(v).forEach(([k, v]) => {
        this.app.log(`setting ${k} to`, typeof v)
      })
    })

    await Object.entries(config).reduce(
      async (
        promised,
        [name, values]: [string, Record<string, any>],
      ) => {
        await promised
        this.app.log(
          `parsing ${name} settings from static configuration(s)`,
        )

        await this.app.make(name, async instance => {
          Object.entries(values)
            .filter(([key]) => key !== 'extensions')
            .forEach(([key, value]) => {
              const item = instance[key]

              if (key === 'settings') {
                this.app.log(
                  `setting ${key} on ${instance.name} to`,
                  value,
                )

                return instance.store.set(key, value)
              }

              if (!item) {
                return this.app.warn(
                  `config key ${key} for ${instance} has no match and is ignored`,
                )
              }

              if (isFunction(item)) {
                this.app.log(
                  `calling ${key} function on the ${instance.name} compiler`,
                )

                return item(value)
              }
            })
        })

        return Promise.resolve()
      },
      Promise.resolve(),
    )
  }
}
