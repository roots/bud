import {bind} from '@roots/bud-support/decorators'
import patchConsole from '@roots/bud-support/patch-console'

import {Service} from '../service.js'

/**
 * Received messages
 *
 * @public
 */
interface Messages {
  stdout: string[]
  stderr: string[]
}

/**
 * Map stream name to logging function name
 *
 * @public
 */
const streamDictionary = {
  stdout: `log`,
  stderr: `error`,
}

/**
 * ConsoleBuffer service class
 *
 * @remarks
 * Intercepts console function calls and emits them using the bud logger.
 * Deduplicates and trims console output.
 *
 * @public
 */
export default class ConsoleBuffer extends Service {
  /**
   * Service label
   * @public
   */
  public static label = `consoleBuffer`

  /**
   * Received messages
   * @public
   */
  public messages: Messages = {stdout: [], stderr: []}

  /**
   * Restore console function
   *
   * @remarks
   * Returned from {@link patchConsole} call. This is called to restore
   * the normal {@link console} behavior.
   *
   * @public
   */
  public restore: () => any

  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    // Don't mess with console if --ci flag is `true`
    if (this.app.context?.args?.ci) return

    // Overwrite service logger with a specially configured `Signale` instance
    this.logger = this.app.logger.makeInstance({
      disabled: this.app.context.args?.log === false,
      config: {
        displayLabel: false,
        displayBadge: false,
        displayTimestamp: true,
      },
      // Unlike the main bud.logger, emit everything
      logLevel: `info`,
    })

    // Patch the console, and assign the restore function
    this.restore = patchConsole((stream, data) => {
      /**
       * Clean up log message whitespace, etc.
       */
      const message = data
        .split(`\n`)
        .map(line => line.trim())
        .filter(Boolean)
        .join(`\n`)
        .trim()

      // Ignore messages that are empty or just whitespace
      if (!message || message === `` || message.match(/^\s*?$/)) return

      // Ignore messages that have been logged before
      if (this.messages[stream].some(stale => stale === message)) return

      // Add message to buffer
      this.messages[stream].push(message)

      // Log message to console
      this.logger
        .scope(...this.app.logger.scope, stream)
        [streamDictionary[stream]](message)
    })

    /**
     * On compiler close event, restore {@link console} methods
     */
    this.app.hooks.action(`compiler.close`, this.restore)
  }
}
