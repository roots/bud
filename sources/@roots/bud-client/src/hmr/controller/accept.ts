/* eslint-disable no-console */

import {AcceptOptions} from './interface'

/**
 * Module accept options/handlers
 */
export const accept: AcceptOptions = {
  /**
   * If true the update process continues even if some modules are not accepted
   * (and would bubble to the entry point).
   */
  ignoreUnaccepted: true,

  /**
   * Ignore changes made to declined modules.
   */
  ignoreDeclined: true,

  /**
   * Ignore errors throw in accept handlers, error handlers and while reevaluating module.
   */
  ignoreErrored: true,

  /**
   * Notifier for unaccepted modules
   */
  onUnaccepted(data) {
    console.warn(
      'Ignored an update to unaccepted module ' + data.chain.join(' -> '),
    )
  },

  /**
   * Notifier for declined modules
   */
  onDeclined(data) {
    console.warn(
      'Ignored an update to declined module ' + data.chain.join(' -> '),
    )
  },

  /**
   * Notifier for errors.
   */
  onErrored(data) {
    console.error(data.error)
    console.warn(
      'Ignored an error while updating module ' +
        data.moduleId +
        ' (' +
        data.type +
        ')',
    )
  },
}
