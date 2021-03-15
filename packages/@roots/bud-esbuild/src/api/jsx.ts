import type {Framework} from '@roots/bud-framework'
import {isEqual} from '@roots/bud-support'

export const jsx: Framework.ESBuild.JSX = function (enabled) {
  this.publish({
    'item/esbuild-js/options/loader': () =>
      isEqual(enabled, false) ? 'js' : 'jsx',
    'item/esbuild-ts/options/loader': () =>
      isEqual(enabled, false) ? 'ts' : 'tsx',
  })

  return this
}
