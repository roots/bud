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
  public access<I = unknown>(key: string | number): I

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
  topics(topics: string[], caller?: string)

  /**
   * Subscriptions
   */
  subscribe(name: string, caller?: string)

  /**
   * Publish
   */
  publish<T = any>(pubs: {[key: string]: any}, caller?: string)
}
