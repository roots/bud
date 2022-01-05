import * as Framework from '@roots/bud-framework'
import Express from 'express'

import * as middleware from '../middleware'
import __BudRouter from '../router/__bud'
import {inject} from '../util/inject'
import {bind} from './server.dependencies'
import {Http} from './server.http'
import {Https} from './server.https'
import {Watcher} from './server.watcher'

/**
 * Server service class
 *
 * @public
 */
export class Server
  extends Framework.Service
  implements Framework.Server.Interface
{
  /**
   * Express instance
   *
   * @public
   */
  public application: Framework.Server.Application

  /**
   * Server config accessor
   *
   * @public
   */
  public get config(): Framework.Server.Configuration {
    return this.app.store.get('server')
  }

  /**
   * HTTP connections
   *
   * @public
   */
  public http: Http

  /**
   * HTTPS connections
   *
   * @public
   */
  public https: Https

  /**
   * Express instance
   *
   * @public
   */
  public instance: {
    http: Framework.Server.HttpInstance
    https: Framework.Server.HttpsInstance
  } = {
    http: null,
    https: null,
  }

  /**
   * Utilized middleware
   *
   * @public
   */
  public middleware: Framework.Server.Middleware

  /**
   * Watcher instance
   *
   * @public
   */
  public watcher: Watcher

  /**
   * Service boot callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<void> {
    this.application = Express()

    this.app.hooks.on('server.middleware', () => middleware)

    this.app.hooks.on('server.inject', () => [
      instance =>
        `@roots/bud-server/client/index.js?name=${instance.name}&path=/__bud/hmr`,
    ])

    this.app.hooks.async('event.server.before', async app => {
      app.when(
        ({store}) => store.is('features.proxy', true),
        ({hooks}) =>
          hooks.on('server.inject', inject => [
            ...inject,
            () =>
              `@roots/bud-server/client/proxy-click-interceptor.js`,
          ]),
      )

      return app
    })
  }

  /**
   * Run server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(): Promise<this> {
    /* Instantiate watcher */
    this.watcher = new Watcher(this.app)

    /* Filter server before */
    await this.app.hooks.filterAsync<'event.server.before'>(
      'event.server.before',
      this.app,
    )

    /* Prep and run compilation */
    await this.compile()

    /* Apply middleware */
    Object.entries(
      this.app.hooks.filter('server.middleware'),
    ).map(([key, factory]) => {
      this.log(`info`, `using middleware: ${key}`)
      const middleware = factory(this.app)
      middleware && this.application.use(middleware)
    })

    /* 404 middleware */
    this.application.use(
      (
        _req: Express.Request,
        res: Express.Response,
        _next: Express.NextFunction,
      ) => {
        res.status(404).send("Sorry can't find that!")
      },
    )

    await this.initializeServers()

    /**
     * If watching and a watched file is touched, update hmr websocket
     * event subscribers.
     */
    await this.watcher.watch()
    this.watcher.instance.on('change', path => {
      this.middleware?.hot?.publish({
        action: 'reload',
        message: `Detected file change: ${path}. Reloading window.`,
      })
    })

    await this.app.hooks.filterAsync<'event.server.after'>(
      'event.server.after',
      this.app,
    )

    return this
  }

  @bind
  public async initializeServers(): Promise<void> {
    this.http = new Http(this.app)
    this.https = new Https(this.app)

    if (
      this.https.isEnabled() &&
      this.https.hasKey() &&
      this.https.hasCert()
    ) {
      const listener = await this.https.createServer(
        this.application,
      )

      this.instance['https'] = listener.listen(
        this.https.port,
        () => {
          this.log(
            'info',
            `started https server on %s`,
            this.https.port,
          )
          this.app.hooks.filter('event.server.listen')
        },
      )
    }

    /**
     * Instantiate HTTP
     */
    const listener = await this.http.createServer(
      this.application,
    )
    this.instance['http'] = listener.listen(
      this.http.port,
      () => {
        this.log(
          'info',
          `started http.server on %s`,
          this.http.port,
        )
        this.app.hooks.filter('event.server.listen')
      },
    )
  }

  /**
   * Compile
   */
  @bind
  public async compile() {
    await Promise.all(
      [this.app, ...this.app.children.getValues()].map(
        async (instance: Framework.Framework) => {
          await inject(
            instance,
            this.app.hooks.filter('server.inject'),
          )
        },
      ),
    )

    this.app.hooks.on('config.override', config => {
      return config.map(compilerConfiguration => {
        compilerConfiguration.bail = false
        return compilerConfiguration
      })
    })

    await this.app.compiler.compile()
  }

  /**
   * App close handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public close(): void {}
}
