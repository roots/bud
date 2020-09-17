import {ServerConfig} from '@roots/bud-server'
import BudInterface from '../Bud'

/**
 * ## bud.dev
 *
 * Configure BudInterface's built in development server.
 */
export type Dev = (
  this: BudInterface,
  options: ServerConfig,
) => BudInterface

const dev: Dev = function (options) {
  this.features.enable('dev')

  if (!options) {
    return this
  }

  this.options.merge('server', options)

  return this
}

export {dev as default}
