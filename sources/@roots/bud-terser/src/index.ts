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

import TerserPlugin from 'terser-webpack-plugin'

export type Options = TerserPlugin.BasePluginOptions
export type Plugin = TerserPlugin

import Extension from './terser.extension'
export default Extension
