import {ESBuild, Framework} from '@roots/bud-framework'
import {isEqual} from 'lodash'

export const jsx: ESBuild.JSX = function (enabled): Framework {
  this.publish({
    'item/esbuild-js/options/loader': () =>
      isEqual(enabled, false) ? 'js' : 'jsx',
    'item/esbuild-ts/options/loader': () =>
      isEqual(enabled, false) ? 'ts' : 'tsx',
  })

  return this
}
