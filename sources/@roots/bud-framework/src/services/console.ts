import {bind} from '@roots/bud-support/decorators/bind'
import patchConsole from '@roots/bud-support/patch-console'

import type {Bud} from '../index.js'

import {Service} from '../service.js'

/**
 * Received messages
 */
type MessagesCache = Array<{
  message: string
  stream: `stderr` | `stdout`
}>

/**
 * ConsoleBuffer {@link Service}
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
   * Restore console function
   *
   * @remarks
   * Returned from {@link patchConsole} call. This is called to restore
   * the normal {@link console} behavior.
   */
  public restore?: () => any

  /**
   * Already processed messages
   */
  public stack: MessagesCache = []

  /**
   * Fetch and remove
   *
   * @remarks
   * Transfers messages from {@link ConsoleBuffer.queue} to {@link ConsoleBuffer.stack}
   */
  public fetchAndRemove() {
    const queue = [...this.queue]
    this.queue = []
    this.stack.push(...queue)
    return queue
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async register(bud: Bud) {
    if (bud.context.ci) return

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

      // Push to queue
      this.queue.push({message, stream})
      this.app[stream === `stderr` ? `error` : `log`](message)
    })
  }
}
