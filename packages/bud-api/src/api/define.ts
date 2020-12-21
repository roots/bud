import type {Framework, Index} from '@roots/bud-typings'

export const define: Define = function (values) {
  this.extensions.get('webpack-define-plugin').mergeStore(values)

  return this
}

export type Define = (
  this: Framework,
  values: Index<any>,
) => Framework
