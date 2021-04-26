import {boundMethod as bind} from 'autobind-decorator'
import {Container} from '@roots/container'
import type {
  Bootstrapper,
  Index,
  Service,
} from '@roots/bud-typings'
import type {Framework} from '.'

export abstract class Core {
  public name = 'bud'

  protected _services: Container<Service>

  protected _instance: Container<Framework>

  protected _mode: 'production' | 'development'

  public get services(): Container<Service> {
    return this._services
  }

  public set services(services: Container<Service>) {
    this._services = services
  }

  public get mode(): 'production' | 'development' {
    return this._mode
  }

  public set mode(mode: 'production' | 'development') {
    this._mode = mode
  }

  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  /**
   * Bootstrap
   *
   * Bind services to the Framework
   */
  @bind
  public bootstrap(
    services: Index<
      new (app: Framework['get']) => Service | Bootstrapper
    >,
  ) {
    this.services = this.container(services)

    this.services.getEntries().map(([key, Instance]) => {
      this[key] = new Instance(this.get)
    })

    return this
  }

  /**
   * Lifecycle
   *
   * Run lifecycle events across all containers.
   */
  @bind
  public lifecycle() {
    const events = [
      'bootstrap',
      'bootstrapped',
      'register',
      'registered',
      'boot',
      'booted',
    ]

    events.forEach(event => {
      this.services.getKeys().forEach(serviceName => {
        console.log(serviceName, event)

        const service = this[serviceName]
        const guard = service && service[event]

        guard && service[event](this)
      })
    })

    return this
  }

  /**
   * ## container
   *
   * Make a new container
   *
   * ### Usage
   *
   * ```js
   * const container = app.container({data: 'stuff'})
   * container.get('data') // => 'stuff'
   * ```
   */
  public container(
    repository?: Container['repository'],
  ): Container {
    return new Container(repository ?? {})
  }

  /**
   * Get framework or a service
   */
  @bind
  public get<I = Service>(
    service?: string | number,
  ): I | Framework {
    return service ? this[service] : this
  }

  /**
   * Get framework instance.
   */
  @bind
  public getInstance(key: string): Framework {
    return this._instance.get(key)
  }

  /**
   * Set framework instance.
   */
  @bind
  public setInstance(key: string, app: Framework) {
    Object.assign(this, {
      _instance: {
        [key]: app,
      },
    })
  }
}
