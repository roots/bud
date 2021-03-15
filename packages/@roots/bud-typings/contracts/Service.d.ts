import {Container, Framework} from './'
/**
 * Application service base
 */
export abstract class Service extends Container {
  [key: string]: any

  /**
   * Application reference
   */
  public app: Framework

  /**
   * Safely access potentially callable values
   */
  public access: Framework['access']

  /**
   * Register service
   */
  public register?(): void

  /**
   * Boot service
   */
  public boot?(): void

  /**
   * Topics
   */
  public get topics(): Framework['topics']

  /**
   * Subscriptions
   */
  public get subscribe(): Framework['subscribe']

  /**
   * Publish
   */
  public get publish(): Framework['publish']

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
