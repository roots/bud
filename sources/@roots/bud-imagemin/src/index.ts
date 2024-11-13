// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * `@roots/bud-imagemin`
 *
 * Image optimization for bud.js.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {Generator as ImageminGenerator} from 'image-minimizer-webpack-plugin'

import BudImageminExtension from './extension/index.js'
import './types/index.js'

type Generator = ImageminGenerator<any>

type Minimizer = {[key: string]: any}

type MinimizerMap = Map<string, Minimizer>

type GeneratorMap = Map<string, Generator>

type MutateMinimizerOptions<K extends `${keyof Minimizer & string}`> = (
  minimizer: Minimizer[K],
) => Minimizer[K]

export default BudImageminExtension

export type {
  Generator,
  GeneratorMap,
  Minimizer,
  MinimizerMap,
  MutateMinimizerOptions,
}
