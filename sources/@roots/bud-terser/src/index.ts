// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds terser minification support to Bud
 *
 * @see https://rootss.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './bud.env'

import {Bud, Extensions} from '@roots/bud-framework'
import TerserPlugin from 'terser-webpack-plugin/types'

import * as extension from './terser.extension'

export type Options = TerserPlugin.BasePluginOptions

export type Plugin = TerserPlugin

export interface Extension
  extends Extensions.Plugin<TerserPlugin, TerserPlugin.BasePluginOptions> {
  label: '@roots/bud-terser'
  options: (app: Bud) => Options
}

export const {label, api, options, boot} = extension
