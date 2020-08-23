import type {Bud} from './types'

type Alias = (this: Bud, options: any) => Bud

const alias: Alias = function (options) {
  this.options.set('webpack.resolve.alias', {
    ...this.options.get('webpack.resolve.alias'),
    ...this.hooks.filter('api.alias', options),
  })

  return this
}

export {alias}
export type {Alias}
