import type {Bud, Index} from '@roots/bud-typings'

export const define: Define = function (values) {
  this.extensions.get('webpack-define-plugin').mergeStore(values)

  return this
}

export type Define<T = Bud> = (this: T, values: Index<any>) => T
