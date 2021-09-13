/**
 * Imagemin adapter for Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * Add image optimization support to Bud projects
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudImageMinExtension} from './BudImageMinExtension'
import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Manage image minimizer plugins and options
     *
     * @public
     */
    imagemin: Config
  }

  /**
   * @override
   * @public
   */
  interface Plugins {
    '@roots/bud-imagemin': BudImageMinPlugin
    'image-minimizer-webpack-plugin': BudImageMinPlugin
  }

  /**
   * @override
   * @public
   */
  interface Modules {
    '@roots/bud-imagemin': BudImageMinExtension
  }
}

export const {name, api, register, boot} = BudImageMinExtension
export type {Config}
