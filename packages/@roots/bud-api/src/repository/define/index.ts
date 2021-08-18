import type {DefinePlugin} from 'webpack'

import type {Repository} from '../'

const define: Repository.Define = function (values) {
  this.hooks.on(
    'extension/webpack-define-plugin/options',
    (existant: DefinePlugin['definitions']) => ({
      ...existant,
      ...values,
    }),
  )

  return this
}

export {define}
