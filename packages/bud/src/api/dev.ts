import type {Bud} from './types'

type Dev = (this: Bud, options: any) => Bud

const dev: Dev = function (options) {
  this.options.set('webpack.devServer', {
    ...this.options.get('webpack.devServer'),
    ...(options ?? []),
  })

  return this
}

export {dev, Dev}
