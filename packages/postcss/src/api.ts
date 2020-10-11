import type {Options} from './types'

const postcss: Framework.Config.Fluent<
  Framework.Bud,
  Options
> = function (this: Framework.Bud, options: Options) {
  this.store['features'].enable('postcss')

  this.components['items']
    .get('postcss')
    .setOptions({...options})

  return this
}

export {postcss}
