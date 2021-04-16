import {Container, Framework} from './'

export abstract class Bootstrapper {
  /**
   * Loose
   */
  [key: string]: any

  /**
   * Bootstrap
   */
  public bootstrap?(app: Framework): unknown

  /**
   * Bootstrap
   */
  public bootstrapped?(app: Framework): unknown

  /**
   * Register
   */
  public register?(app: Framework): unknown

  /**
   * Post registered callback
   */
  public registered?(app: Framework): unknown

  /**
   * Boot
   */
  public boot?(ap: Framework): unknown

  /**
   * Post boot callback
   */
  public booted?(app: Framework): unknown
}

/**
 * Application base service
 */
export abstract class Service extends Bootstrapper {
  /**
   * Application reference
   */
  public app: Framework

  /**
   * Log
   */
  public get log(): Framework['log']

  /**
   * Info
   */
  public get info(): Framework['info']

  /**
   * Error
   */
  public get error(): Framework['error']

  /**
   * Warning
   */
  public get warning(): Framework['warning']

  /**
   * Debug
   */
  public get debug(): Framework['debug']
}

export namespace Service {
  export interface Dict {
    [name: string]: Constructor
  }

  export interface Constructor {
    new (app: Framework):
      | Framework.Bootstrapper
      | Framework.Service
  }
}
