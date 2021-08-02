/**
 * @module Factory
 */

import type {Configuration, Framework} from '..'

/**
 * @interface Factory
 *
 * Create a Bud instance programmatically.
 */
export declare interface Factory {
  (overrides?: Factory.Options): Framework
}

export declare namespace Factory {
  /**
   * @interface Factory.Options
   *
   * Overrides for extensions, services and base configuration.
   */
  interface Options {
    name: string
    mode?: 'production' | 'development'
    config?: Configuration
    services?: Framework.Services
    parent?: Framework
  }
}

export {factory} from './factory'
