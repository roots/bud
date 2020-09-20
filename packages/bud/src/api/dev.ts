import {ServerConfig} from '@roots/bud-server'
import BudInterface from '../Bud'

/**
 * ## bud.dev
 *
 * Enable and configure the built in development server.
 */
export type Dev = (
  this: BudInterface,
  options: ServerConfig,
) => BudInterface

const dev: Dev = function (options) {
  /** Enable dev server */
  this.features.enable('dev')

  /** If they didn't specify anything, bail. */
  if (!options) {
    return this
  }

  /** Enable proxy middleware */
  ;(options.to || options.from) && this.features.enable('proxy')

  /** Enable host middleware */
  options.hot && this.features.enable('hot')

  /** Merge options object onto server option store */
  this.options.merge('server', options)

  /** Maintain fluent config. */
  return this
}

export {dev as default}
