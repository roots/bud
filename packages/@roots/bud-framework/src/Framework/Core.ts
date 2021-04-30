import type {
  Bootstrapper,
  Index,
  Service,
} from '@roots/bud-typings'
import {Container} from '@roots/container'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework} from './index'
import {Store} from '../Store/index'

export abstract class Core {
  public name = 'bud'

  public store: Store

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

  public constructor(config?: Store['repository']) {
    this.store = new Store(this.get).setStore(config ?? {})
  }

  @bind
  public get<I = Service>(
    service?: string | number,
  ): I | Framework {
    return service ? this[service] : this
  }

  @bind
  public getInstance(key: string): Framework {
    return this._instance.get(key)
  }

  @bind
  public setInstance(key: string, app: Framework) {
    Object.assign(this, {
      _instance: {
        [key]: app,
      },
    })
  }

  @bind
  public bootstrap(
    services: Index<
      new (app: Framework['get']) => Service | Bootstrapper
    >,
  ): this {
    this.services = this.container(services)

    this.services.getEntries().map(([key, Instance]) => {
      this[key] = new Instance(this.get)
    })

    return this
  }

  @bind
  public lifecycle(): this {
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
        const service = this[serviceName]
        service && service[event] && service[event](this)
      })
    })

    return this
  }

  public container(
    repository?: Container['repository'],
  ): Container {
    return new Container(repository ?? {})
  }
}
