import type {Bud, Index} from '@roots/bud-typings'

export type Define = (
  this: Bud.Contract,
  values: Index<any>,
) => Bud.Contract

export const define: Define = function (values): Bud.Contract {
  this.extensions.get('webpack-define-plugin').setStore({
    ...this.extensions.get('webpack-define-plugin').getStore(),
    ...values,
  })

  return this
}
