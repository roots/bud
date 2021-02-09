import type {Bud} from '@roots/bud'
import {isEqual} from '@roots/bud-support'

export const jsx: Bud.ESBuild.JSX = function (enabled) {
  this.build
    .set(
      'items.esbuild-js.options.loader',
      isEqual(enabled, false) ? 'js' : 'jsx',
    )
    .set(
      'items.esbuild-ts.options.loader',
      isEqual(enabled, false) ? 'ts' : 'tsx',
    )

  return this
}
