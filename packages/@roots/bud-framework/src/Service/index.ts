import {Container} from '@roots/container'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework} from '../Framework'

abstract class Bootstrapper<T = any> extends Container<T> {
  /**
   * Bootstrap
   */
  public bootstrap?(app: Framework): any

  /**
   * Bootstrapped
   */
  public bootstrapped?(app: Framework): any

  /**
   * Register
   */
  public register?(app: Framework): any

  /**
   * Post registered callback
   */
  public registered?(app: Framework): any

  /**
   * Boot
   */
  public boot?(app: Framework): any

  /**
   * Post boot callback
   */
  public booted?(app: Framework): any
}

abstract class Service<T = any> extends Bootstrapper<T> {
  public name: string

  private _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    super()
    this._app = () => app
  }

  public get access(): Framework['access'] {
    return this.app.access
  }

  @bind
  public filterUnique(value, index, self) {
    return self.indexOf(value) === index
  }
}

export {Bootstrapper, Service}
