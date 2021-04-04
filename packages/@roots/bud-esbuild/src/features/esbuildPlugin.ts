import type {Module} from '@roots/bud-framework'
import {ESBuildPlugin} from 'esbuild-loader'

/**
 * @const esbuildPlugin
 * @description wrapper for esbuild-loader's webpack plugin
 */
export const esbuildPlugin: Module = {
  /**
   * @property esbuild.name
   * @description extension identifier
   */
  name: 'esbuild-plugin',

  /**
   * @property esbuild.make
   * @description produces a webpack plugin
   */
  make: () => new ESBuildPlugin(),
}
