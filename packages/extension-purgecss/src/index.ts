import PurgeCssPlugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'

export const boot: Framework.Extension.Boot = (
  instance: Framework.Bud,
) => {
  instance.presets.set('purgecss', {wp})

  Object.assign(instance, {
    purgecss: configuration,
  })
}

function configuration(
  this: Framework.Bud,
  userOptions: Purge.UserOptions,
) {
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
}
