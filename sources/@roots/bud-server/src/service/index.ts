import type {Bud} from '@roots/bud-framework'
import type {
  Service as BaseService,
  Connection,
  Middleware,
} from '@roots/bud-framework/services/server'
import type {Watcher} from '@roots/bud-server/server/watcher'

import {Service} from '@roots/bud-framework/service'
import {inject} from '@roots/bud-server/inject'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, ServerError} from '@roots/bud-support/errors'

/**
 * Server service class
 */
export class Server extends Service implements BaseService {
  /**
   * Express instance
   */
  public application: Express.Application & {set: any; use: any}

  /**
   * Applied middleware
   */
  public appliedMiddleware: Partial<
    Record<keyof Middleware.Available, any>
  > = {}

  /**
   * Available middleware
   */
  public availableMiddleware = {
    cookie: `@roots/bud-server/middleware/cookie`,
    dev: `@roots/bud-server/middleware/dev`,
    hot: `@roots/bud-server/middleware/hot`,
    proxy: `@roots/bud-server/middleware/proxy`,
  }

  /**
   * Server connections
   */
  public connection: Connection

  /**
   * Watcher instance
   */
  public watcher: Watcher

  /**
   * Apply middleware
   */
  @bind
  public async applyMiddleware() {
    try {
      await Promise.all(
        Object.entries(this.enabledMiddleware).map(
          async ([key, signifier]) => {
            if (this.app.context.hot === false && key === `hot`) return

            /** import middleware */
            const {factory} = await this.app.module.import(
              signifier,
              import.meta.url,
            )
            /** save reference to middleware instance */
            this.appliedMiddleware[key] = factory(this.app)
            /** apply middleware */
            this.application.use(this.appliedMiddleware[key])
          },
        ),
      )
    } catch (error) {
      throw new ServerError(`Error instantiating middleware`, {
        props: {
          origin: BudError.normalize(error),
          thrownBy: `bud.server.applyMiddleware`,
        },
      })
    }
  }

  /**
   * Utilized middleware
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
   * Inject scripts
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
   * Proxy URL
   */
  public get proxyUrl(): URL {
    return this.app.hooks.filter(`dev.proxyUrl`, new URL(`http://0.0.0.0`))
  }

  /**
   * External proxy URL
   */
  public get publicProxyUrl(): URL {
    return this.app.hooks.filter(`dev.publicProxyUrl`, this.proxyUrl)
  }

  /**
   * External development server URL
   */
  public get publicUrl(): URL {
    return this.app.hooks.filter(`dev.publicUrl`, this.url)
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async register(bud: Bud) {
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

    bud.hooks.action(`server.before`, async () => {
      await this.setConnection()
      await this.injectScripts()
      await bud.compiler.compile()
      await this.applyMiddleware()
      await this.watcher.watch()
    })
  }

  /**
   * Run development server
   */
  @bind
  public async run() {
    await this.app.hooks.fire(`server.before`, this.app)

    if (this.app.context.dry !== true) {
      await this.connection.createServer(this.application)
      await this.connection.listen()
    }

    await this.app.hooks.fire(`server.after`, this.app)
  }

  /**
   * Set connection
   */
  @bind
  public async setConnection(connection?: Connection) {
    if (!connection) {
      const isHttps = this.url.protocol === `https:`

      this.connection = await this.app.module
        .import(
          isHttps
            ? `@roots/bud-server/server/https`
            : `@roots/bud-server/server/http`,
          import.meta.url,
        )
        .then(({Server}) => new Server(this.app))
    } else {
      this.connection = connection
    }

    return this.connection
  }

  /**
   * Development server URL
   */
  public get url(): URL {
    return this.app.hooks.filter(`dev.url`, new URL(`http://0.0.0.0:3000`))
  }
}
