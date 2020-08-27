import {browserSync} from './browserSync'
import {cleanWebpack} from './cleanWebpack'
import {copy} from './copy'
import {define} from './define'
import {fixStyleOnlyEntries} from './fixStyleOnlyEntries'
import {hotModuleReplacement} from './hotModuleReplacement'
import {limitChunkCount} from './limitChunkCount'
import {miniCssExtract} from './miniCssExtract'
import {manifest} from './manifest'
import {provide} from './provide'
import {terser} from './terser'
import {writeFile} from './writeFile'

import type {Bud} from '../..'
import type {Loose} from '@roots/bud-typings'
import type {Repository} from '@roots/bud-framework'
import type {Plugin as WebpackPlugin} from 'webpack'

/**
 * Conditional check determining whether to engage extension functionality.
 */
export type ExtensionConditional = (
  this: ExtensionInterface,
) => boolean

/**
 * Extension method handling options
 */
export type ExtensionOptions = (this: ExtensionInterface) => Loose

/**
 * Constitutes primary extension action.
 */
export type ExtensionMake = (
  this: ExtensionInterface,
) => WebpackPlugin | void

/**
 * Bud Extension Interface
 *
 * @interface
 */
export interface ExtensionInterface extends Loose {
  /**
   * Bud container.
   */
  bud: Bud

  /**
   * Extension identifier.
   */
  name: string

  /**
   * Extension options.
   */
  options?: Repository

  /**
   * Set extension options
   */
  setOptions?: ExtensionOptions

  /**
   * Merge extension options
   */
  mergeOptions?: ExtensionOptions

  /**
   * Primary action of extension.
   */
  make: ExtensionMake

  /**
   * Extension is utilized when true.
   */
  when?: ExtensionConditional
}

/**
 * Bud Extension
 */
export type Extension = (bud: Bud) => ExtensionInterface

export type ExtensionRepository = Extension[]
/**
 * Extension Repository
 */
export type ExtensionRepositoryDefinition = {
  name: string
  register: ExtensionRepository
}

/**
 * Bud Webpack Adapters
 */
const plugins: ExtensionRepositoryDefinition = {
  name: 'plugins',
  register: [
    // browserSync,
    cleanWebpack,
    copy,
    define,
    // fixStyleOnlyEntries,
    hotModuleReplacement,
    manifest,
    // miniCssExtract,
    provide,
    limitChunkCount,
    // terser,
    writeFile,
  ],
}

export {plugins}
