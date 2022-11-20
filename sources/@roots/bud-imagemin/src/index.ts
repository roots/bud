// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add image optimization support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './types.js'

import type {Generator as ImageminGenerator} from 'image-minimizer-webpack-plugin'

import {BudImageminExtension} from './extension.js'

export type Generator = ImageminGenerator<any>

export type Minimizer = {[key: string]: any}

export type MinimizerMap = Map<string, Minimizer>

export type GeneratorMap = Map<string, Generator>

export type MutateMinimizerOptions<
  K extends `${keyof Minimizer & string}`,
> = (minimizer: Minimizer[K]) => Minimizer[K]

export default BudImageminExtension
