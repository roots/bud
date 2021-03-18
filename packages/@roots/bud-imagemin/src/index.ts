import './interfaces'
import {Module} from '@roots/bud-typings'
import * as Plugin from './imagemin'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-imagemin'

/**
 * Extension config methods
 */
export * as api from './api'

/**
 * Extension boot
 */
export const boot: Module['boot'] = ({extensions}) =>
  extensions.add('image-minimizer-webpack-plugin', Plugin)
