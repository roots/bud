import {bind} from '@roots/bud-support/decorators'
import patchConsole from '@roots/bud-support/patch-console'

import type {Bud} from '../bud.js'
import {Service} from '../service.js'

/**
 * Received messages
 */
type MessagesCache = Array<{
  stream: `stdout` | `stderr`
  message: string
}>

/**
 * ConsoleBuffer service class
 *
 * @remarks
 * Intercepts console function calls and emits them using the bud logger.
 * Deduplicates and trims console output.
 */
export default class ConsoleBuffer extends Service {
  /**
   * Received messages
   */
  public queue: MessagesCache = []

  /**
   * Already processed messages
   */
  public stack: MessagesCache = []

  /**
   * Restore console function
   *
   * @remarks
   * Returned from {@link patchConsole} call. This is called to restore
   * the normal {@link console} behavior.
   */
  public restore?: () => any

  public fetchAndRemove() {
    const queue = [...this.queue]
    this.queue = []
    this.stack.push(...queue)
    return queue
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    if (!bud.isCLI() || (bud.isCLI() && bud.context.args?.ci)) return

    // Patch the console, and assign the restore function
    this.restore = patchConsole((stream, data) => {
      if (!data || data === ``) return

      const message = data.trim()

      // Ignore empty
      if (!message) return

      // Ignore messages that have been logged before
      if (
        this.queue.some(
          stale => stale.message === message && stale.stream === stream,
        )
      )
        return

      this.queue.push({stream, message})
      this.app[stream === `stderr` ? `error` : `log`](message)
    })
  }
}
