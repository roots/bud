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
   * Register service
   */
  public register?(): void

  /**
   * Boot service
   */
  public boot?(): void

  /**
   * Safely access potentially callable values
   */
  public access<Expects = any>(
    key: string,
    containerize?: boolean,
  ): Expects | null
}
