import Bud from '@roots/bud-types'
import tailwind from 'tailwindcss'

const tailwindcss: Bud.Plugin.Factory = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.loaders.merge('postcss.options.plugins', [
      tailwind({
        config: this.bud.fs.project('tailwind.config.js'),
      }),
    ])

    /**
     * Handle conflicts between tailwind directives
     * and dart-sass/node-sass compilers
     */
    this.bud.options.set(
      'sass.sassOptions.processCssUrls',
      false,
    )

    /**
     * ## bud.tailwind
     *
     * Configure tailwindcss support. This is optional if your
     * tailwind file is locatable in the root of your project
     * with the name `tailwind.config.js`.
     *
     * ```js
     * bud.tailwind({
     *   config: bud.project('custom-tailwind.js'),
     * })
     * ```
     *
     * ```js
     * bud.tailwind(({theme}) => ({
     *  colors: {},
     *  // ...
     * }))
     * ```
     */
    this.bud.apply('tailwind', function (config: any) {
      this.loaders.merge('postcss.options.plugins', [
        tailwind(config),
      ])

      return this
    })
  },
})

module.exports = tailwindcss
