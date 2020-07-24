import {webpackAdapters} from './adapters/webpack'
import {controller} from './controller'
import type {Plugin} from './types'

/**
 * bud.plugin export
 */
export const plugin: Plugin = {
  webpackAdapters,
  controller,
}
