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
  public restore?: () => any

  public fetchAndRemove(type: keyof MessagesCache) {
    const fetchedMessages = [...this.messages[type]]
    this.messages[type] = []
    return fetchedMessages
  }

  /**
   * `init` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async init(bud: Bud) {
    if (bud.context?.args?.ci) return

    // Patch the console, and assign the restore function
    this.restore = patchConsole((stream, data) => {
      if (!data || data === ``) return

      const message = data.trim()
      // Ignore empty
      if (!message) return
      // Ignore messages that have been logged before
      if (this.messages[stream].some(stale => stale === message)) return

      // Add message to buffer
      this.messages[stream].push(message)
    })
  }
}
