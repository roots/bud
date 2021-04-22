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

  public abstract mode: 'development' | 'production'

  public abstract log(args: any): unknown

  /**
   * Get services
   */
  public get services(): Container<Service> {
    return this._services
  }

  /**
   * Set services
   */
  public set services(services: Container<Service>) {
    this._services = services
  }

  /**
   * Bootstrap
   */
  @bind
  public bootstrap(
    services: Index<
      new (app: Framework['get']) => Service | Bootstrapper
    >,
    mode: 'production' | 'development',
  ) {
    this._mode = mode

    process.env.NODE_ENV = mode
    process.env.BABEL_ENV = mode

    this.services = this.container(services)

    this.services.getEntries().map(([key, Instance]) => {
      this[key] = new Instance(this.get)
    })

    return this
  }

  /**
   * Lifecycle
   */
  @bind
  public lifecycle() {
    ;[
      'bootstrap',
      'bootstrapped',
      'register',
      'registered',
      'boot',
      'booted',
    ].forEach(event =>
      this.services
        .getKeys()
        .map(
          key =>
            this[key] &&
            this[key][event] &&
            this[key][event](this),
        ),
    )

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
  @bind
  public container(
    repository?: Container['repository'],
  ): Container {
    return new Container(repository ?? {})
  }

  /**
   * Get framework.
   */
  @bind
  public get<I = Service>(
    service?: string | number,
  ): I | Framework {
    return service ? this[service] : this
  }

  /**
   * Instance getter
   */
  @bind
  public getInstance(key: string): Framework {
    return this._instance.get(key)
  }

  /**
   * Instance setter
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
