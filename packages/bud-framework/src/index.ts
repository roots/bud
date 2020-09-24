import Container, {Loose} from '@roots/container'
import {
  FileContainerInterface,
  Filesystem,
} from '@roots/filesystem'
import {
  dump,
  format,
  pretty,
  processHandler,
  logger,
  notify,
  terminate,
} from './util'
import Framework from './Framework'
import highlight from 'cli-highlight'

interface FrameworkInterface extends Loose {
  /**
   * Virtual filesystems
   */
  disks: Filesystem

  /**
   * Dump values to the terminal.
   */
  dump: typeof dump

  /**
   * Kill the framework process.
   */
  terminate: typeof terminate

  /**
   * Framework logger.
   */
  logger: typeof logger

  /**
   * Utilities.
   */
  util: {
    /**
     * Dump values to the terminal.
     */
    dump: typeof dump

    /**
     * Format object values safely.
     */
    format: typeof format

    /**
     * Syntax highlighter
     */
    highlight: typeof highlight

    /**
     * Dispatch system notifications.
     */
    notify: typeof notify

    /**
     * Prettier utility.
     */
    pretty: typeof pretty

    /**
     * Process handler.
     */
    processHandler: typeof processHandler

    /**
     * Terminate framework.
     */
    terminate: typeof terminate
  }

  /**
   * Set a framework property.
   */
  apply: (key: string, value: Loose) => void

  /**
   * Make a new container.
   */
  makeContainer: (repo?: Loose) => Container

  /**
   * Make a new hooks container
   */
  makeHooks: (app: FrameworkInterface) => Hooks

  /**
   * Make a new filesystem container
   */
  makeDisk: (
    key?: string,
    baseDir?: string,
    glob?: string[],
  ) => FileContainerInterface
}

export type RegisteredHooks = {
  [name: string]: Hook[]
}

/**
 * A hook definition
 */
export type Hook = {
  name: string
  fn: (...args: any | any[]) => any
  value: any
  fired: boolean
}

/**
 * Framework hooks
 */
export type Hooks = {
  /**
   * Framework logging utility
   */
  logger: any

  /**
   * Logging
   */
  registered: RegisteredHooks

  /**
   * Formats a callback as registrable entry.
   */
  make: (args: any | any[]) => any

  /**
   * Returns all registered hooks.
   */
  entries: () => any[]

  /**
   * Sets a callback on a filter event.
   */
  on: (
    name: string,
    callback: (args: any | any[]) => any,
  ) => void

  /**
   * Calls registered callbacks
   */
  filter: (name: string, value: any) => any
}

export {Framework as default, FrameworkInterface, Loose}
