import {Bud} from './types'

const plugins = (bud: Bud) => ({
  bud,
  adapters: bud.adapters.entries(),
  controller: bud.adapters.controller(bud),

  target: {
    plugins: [],
  },

  make: function () {
    this.target.plugins = this.adapters
      .map(adapter => this.controller.build(adapter))
      .filter(adapter => adapter)

    this.target = this.bud.hooks.filter('webpack.plugins', this.target)
    this.bud.logger.info({name: 'webpack.plugins', value: this.target}, `generated`)
    return this.target
  },
})

export {plugins}
