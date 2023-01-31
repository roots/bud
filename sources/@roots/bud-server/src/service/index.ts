import type {Bud} from '@roots/bud-framework/bud'
import {Service} from '@roots/bud-framework/service'
import type {
  Connection,
  Middleware,
  Service as BaseService,
} from '@roots/bud-framework/services/server'
import {inject} from '@roots/bud-server/inject'
import type {Watcher} from '@roots/bud-server/server/watcher'
import {bind} from '@roots/bud-support/decorators'

/**
 * Server service class
 */
export class Server extends Service implements BaseService {
  /**
   * Express instance
   *
   * @public
   */
  public application: Express.Application & {set: any; use: any}

  /**
   * Watcher instance
   *
   * @public
   */
  public watcher: Watcher

  /**
   * Server connections
   * @public
   */
  public connection: Connection

  /**
   * Available middleware
   * @public
   */
  public availableMiddleware = {
    proxy: `@roots/bud-server/middleware/proxy`,
    cookie: `@roots/bud-server/middleware/cookie`,
    hot: `@roots/bud-server/middleware/hot`,
    dev: `@roots/bud-server/middleware/dev`,
  }

  /**
   * Utilized middleware
   * @public
   */
  public get enabledMiddleware(): BaseService['enabledMiddleware'] {
    return this.app.hooks.filter(`dev.middleware.enabled`, [])?.reduce(
      (enabled, key) => ({
        ...enabled,
        [key]: this.availableMiddleware[key],
      }),
      {},
    )
  }

  /**
   * Applied middleware
   * @public
   */
  public appliedMiddleware: Partial<
    Record<keyof Middleware.Available, any>
  > = {}

  /**
   * Development server URL
   */
  public get url(): URL {
    return this.app.hooks.filter(`dev.url`, new URL(`http://0.0.0.0:3000`))
  }

  /**
   * External development server URL
   */
  public get publicUrl(): URL {
    return this.app.hooks.filter(`dev.publicUrl`, this.url)
  }

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public override async register?(bud: Bud) {
    if (!bud.isDevelopment) return

    this.application = await import(`@roots/bud-support/express`).then(
      ({default: express}) => express(),
    )

    this.watcher = await import(`@roots/bud-server/server/watcher`).then(
      ({Watcher}) => new Watcher(() => bud),
    )

    bud.hooks.on(
      `dev.client.scripts`,
      await import(`@roots/bud-server/hooks`).then(
        ({devClientScripts}) => devClientScripts.callback,
      ),
    )

    this.application.set(`x-powered-by`, false)

    bud.hooks.action(
      `server.before`,
      this.setConnection.bind(this),
      this.injectScripts.bind(this),
      bud.compiler.compile.bind(bud.compiler),
      this.applyMiddleware.bind(this),
      this.watcher.watch.bind(this.watcher),
    )
  }

  /**
   * Set connection
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async setConnection(bud: Bud) {
    const isHttps = this.url.protocol === `https:`

    this.connection = await bud.module
      .import(
        isHttps
          ? `@roots/bud-server/server/https`
          : `@roots/bud-server/server/http`,
      )
      .then(({Server}) => new Server(bud))
  }

  /**
   * Inject scripts
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async injectScripts() {
    const injectOn = async (instance: Bud) =>
      inject(
        instance,
        Array.from(
          this.app.hooks.filter(`dev.client.scripts`, new Set([])),
        ),
      )

    this.app.hasChildren
      ? Object.values(this.app.children).map(injectOn)
      : injectOn(this.app)
  }

  /**
   * Apply middleware
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async applyMiddleware() {
    if (this.app.isCLI() && this.app.context.args.dry) return

    try {
      await Promise.all(
        Object.entries(this.enabledMiddleware).map(
          async ([key, signifier]) => {
            if (
              this.app.isCLI() &&
              this.app.context.args.hot === false &&
              key === `hot`
            )
              return

            try {
              /** import middleware */
              const {factory} = await this.app.module.import(signifier)
              /** save reference to middleware instance */
              this.appliedMiddleware[key] = factory(this.app)
              /** apply middleware */
              this.application.use(this.appliedMiddleware[key])
            } catch (error) {
              this.logger.error(
                `Failed to apply middleware: ${key}`,
                error,
              )
            }
          },
        ),
      )
    } catch (error) {
      throw error
    }
  }

  /**
   * Run development server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.hooks.fire(`server.before`)

    if (!this.app.isCLI() || !this.app.context.args.dry) {
      await this.connection.createServer(this.application)
      await this.connection.listen()
    }

    await this.app.hooks.fire(`server.after`)
  }
}
