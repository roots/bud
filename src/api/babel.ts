import {Bud, BabelCfg, BabelOptions} from './types'

const babel: BabelCfg = function (this: Bud, options: BabelOptions): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.babel', options},
    `bud.babel called`,
  )

  this.features.enable('babel')
  this.options.set('babel', {
    ...this.options.get('babel'),
    ...this.hooks.filter('filter_babel_options', options),
  })

  this.hooks.call('post_babel')

  return this
}

export {babel}
