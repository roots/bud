import type {Configuration, Framework} from '..'

/**
 * Create a Bud instance programmatically.
 */
export declare interface Factory {
  (overrides?: Factory.Options): Framework
}

export declare namespace Factory {
  /**
   * Overrides for extensions, services and base configuration.
   */
  interface Options {
    /**
     * Application name
     */
    name: Framework['name']

    /**
     * Compilation mode
     */
    mode?: Framework['mode']

    /**
     * Framework base configuration
     */
    config?: Configuration

    /**
     * Registered services
     */
    services?: Framework.Services
  }
}

export {factory} from './factory'
