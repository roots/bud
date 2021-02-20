import {Container, Framework} from './'
/**
 * Application service base
 */
export interface Service extends Container {
  [key: string]: any

  /**
   * Application reference
   */
  app: Framework

  /**
   * Register service
   */
  register?(): void

  /**
   * Boot service
   */
  boot?(): void

  /**
   * Safely access potentially callable values
   */
  access<Expects = any>(
    key: string,
    containerize?: boolean,
  ): Expects | null
}
