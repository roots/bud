import {Framework, PostCss} from '@roots/bud-framework'
import {Signale} from 'signale'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

/**
 * PostCSS configuration
 */
export class PostCssConfig implements PostCss {
  /**
   * Framework
   */
  public _app: Framework['get']

  /**
   * Plugins
   */
  public _plugins: PostCss.Registry = {}

  /**
   * Plugin order
   */
  public _order: string[] = []

  /**
   * Logger
   */
  public logger: Signale

  /**
   * Constructor
   */
  public constructor({app}: {app: Framework}) {
    this.app = app
    this.logger = this.app.logger.instance.scope(
      '@roots/bud-postcss',
    )

    this.set = this.set.bind(this)
    this.unset = this.unset.bind(this)
    this.setOptions = this.setOptions.bind(this)
    this.makeConfig = this.makeConfig.bind(this)
    this.setOrder = this.setOrder.bind(this)
  }

  /**
   * Conditional check for postcss configurations in project
   *
   * True if project:
   *  - has postcss.config.js file in project root
   *  - has .postcssrc file in project root
   *  - has a `postcss` field in `package.json`
   */
  public get hasProjectConfig(): boolean {
    const project = this.app.disk.get('project')

    return (
      project.has('postcss.config.js') ||
      project
        .readJson('package.json')
        .hasOwnProperty('postcss') ||
      project.has('.postcssrc')
    )
  }

  /**
   * Getters/setters
   */
  public get app(): Framework {
    return this._app()
  }

  public set app(app: Framework) {
    this._app = app.get
  }

  public get plugins() {
    return this._plugins
  }

  public set plugins(plugins) {
    this._plugins = plugins
  }

  public get order() {
    return this._order
  }

  public set order(order: string[]) {
    this._order = order
  }

  /**
   * Set plugin
   */
  @bind
  public set(definition: PostCss.Registrable): this {
    const [plugin, options] = isString(definition)
      ? [definition, undefined]
      : definition

    this.logger.debug(`Setting plugin: ${plugin}`)

    // Merge plugin
    this.plugins = {...this.plugins, [plugin]: options}

    // Update order
    this.order.push(plugin)

    return this
  }

  /**
   * Unset plugin
   */
  @bind
  public unset(plugin: string) {
    this.logger.debug(`Removing ${plugin}`)

    // Remove plugin
    delete this.plugins[plugin]

    // Update order
    this.order = this.order.filter(key => key !== plugin)

    return this
  }

  /**
   * Override plugin options
   */
  @bind
  public setOptions(plugin: string, options: any): this {
    this.logger.debug(`Setting ${plugin} options`)
    this.plugins[plugin] = options

    return this
  }

  /**
   * Order plugins
   */
  @bind
  public setOrder(plugins: string[]): this {
    this.logger.debug(
      `Ordering postcss plugins: ${plugins.join()}`,
    )

    this.order = plugins.reduce(
      (plugins, plugin) => [...plugins, plugin],
      [],
    )

    return this
  }

  /**
   * Make final plugins config output
   */
  @bind
  public makeConfig(): any {
    return this.order.map(key => {
      const pkg = require.resolve(key)
      pkg
        ? this.logger.debug(`Resolved ${key} to ${pkg}`)
        : this.app.dashboard.error(
            `Can't resolve ${key}`,
            '@roots/bud-postcss',
          )

      return require(pkg)(this.plugins[key])
    })
  }
}
