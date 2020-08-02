import {loaders} from './util/loaders'
import {patterns} from './util/patterns'

const font = bud => ({
  bud,

  make: function () {
    this.options = {
      test: this.bud.hooks.filter(
        'loaders_font_test',
        patterns.font
      ),
      use: this.bud.hooks.filter(
        'loaders_font_use',
        [{
          loader: loaders.url,
          options: {
            name: '[path][name].[ext]',
          },
        }],
      ),
    }

    return this.bud.hooks.filter(
      'loaders_font_final',
      this.options
    )
  },
})

export {font}
