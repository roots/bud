import {bind} from '@roots/bud-support/decorators'
import patchConsole from '@roots/bud-support/patch-console'

import type {Bud} from '../bud.js'
import {Service} from '../service.js'

/**
 * Received messages
 *
 * @public
 */
interface MessagesCache {
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
  public static override label = `consoleBuffer`

  /**
   * Received messages
   * @public
   */
  public messages: MessagesCache = {stdout: [], stderr: []}

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
  public override async boot(bud: Bud) {
    if (bud.context?.args?.ci) return
    const logger = bud.logger.makeInstance({
      disabled: bud.context.args?.log === false,
      config: {
        displayLabel: false,
        displayBadge: false,
        displayScope: false,
      },
      logLevel: `info`,
    })

    this.restore = patchConsole((stream, data) => {
      const message = data.trim()

      if (!message || message.length === 0) return
      if (this.messages[stream].some(message => message === data)) return

      logger[stream === `stdout` ? `log` : `error`](
        bud.logger.format({
          message: message.replace(`${bud.label}:\n`, ``),
        }),
      )
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

      // Ignore empty messages
      if (!message) return

      // Ignore messages that have been logged before
      if (this.messages[stream].some(stale => stale === message)) return

      // Add message to buffer
      this.messages[stream].push(message)

      // Log message to console
      this.logger
        .scope(...bud.logger.scope, stream)
        [streamDictionary[stream]](message)
    })

    /**
     * On compiler close event, restore {@link console} methods
     */
    bud.hooks.action(`compiler.close`, this.restore)
  }
}
