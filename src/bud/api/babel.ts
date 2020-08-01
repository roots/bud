import {Bud, BabelCfg, BabelOptions} from './types'
import {bud} from '../..'

const babel: BabelCfg = function (this: Bud, options: BabelOptions): Bud {
  this.features.enable('babel')
  this.options.set('babel', {
    ...this.options.get('babel'),
    ...this.hooks.filter('filter_babel_options', options),
  })

  this.hooks.call('post_babel')

  return this
}

export {babel}
