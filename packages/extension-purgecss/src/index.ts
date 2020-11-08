import PurgeCssPlugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'
import type Framework from '@roots/bud-typings'

export const boot: Framework.Extension.Boot = (
  instance: Framework.Bud,
) => {
  instance.presets.set('purgecss', {wp})
}

export const api = {
  purgecss: function configuration(
    this: Framework.Bud,
    userOptions: Purge.UserOptions,
  ): Framework.Bud {
    const {options} = this.build.items['postcss'].make()

    this.build.items['postcss'].setOptions({
      ...options,
      postcssOptions: {
        ...options.postcssOptions,
        plugins: [
          ...options.postcssOptions.plugins,
          PurgeCssPlugin(userOptions),
        ],
      },
    })

    return this
  },
}
