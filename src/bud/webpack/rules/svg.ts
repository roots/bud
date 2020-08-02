import {loaders} from './util/loaders'
import {patterns} from './util/patterns'

const svg = bud => ({
  bud,

  make: function () {
    this.bud.hooks.call('pre_svg')

    this.output = {
      test: this.bud.hooks.filter('loaders_svg_test', patterns.svg),
      use: this.bud.hooks.filter('loaders_svg_use', [loaders.svgr, loaders.url]),
    }

    this.bud.hooks.call('post_svg')

    return this.bud.hooks.filter('loaders_svg_final', this.output)
  },
})

export {svg}
