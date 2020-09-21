import Container, {Loose} from '@roots/container'
import Filesystem from '@roots/filesystem'
import {
  dump,
  format,
  pretty,
  processHandler,
  logger,
  notify,
  terminate,
} from './util'
import {Hooks} from './hooks'

import Framework from './Framework'

interface FrameworkInterface extends Loose {
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
  makeDisk: (baseDir?: string, pattern?: string[]) => Filesystem
}

export {Framework as default, FrameworkInterface, Hooks, Loose}
