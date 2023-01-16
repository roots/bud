// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/bud-imagemin`
 *
 * Image optimization for bud.js.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import './types/index.js'

import type {Generator as ImageminGenerator} from 'image-minimizer-webpack-plugin'

import BudImageminExtension from './extension/index.js'

type Generator = ImageminGenerator<any>

type Minimizer = {[key: string]: any}

type MinimizerMap = Map<string, Minimizer>

type GeneratorMap = Map<string, Generator>

type MutateMinimizerOptions<
  K extends `${keyof Minimizer & string}`,
> = (minimizer: Minimizer[K]) => Minimizer[K]

export default BudImageminExtension

export type {Generator, Minimizer, MinimizerMap, GeneratorMap, MutateMinimizerOptions}
