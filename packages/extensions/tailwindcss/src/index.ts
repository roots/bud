import Bud from '@roots/bud-types'
import TailwindSupport from 'TailwindSupport'
import tailwindcss from 'tailwindcss'

const TailwindSupport = (bud: Bud): Bud.Plugin.Extension => ({
  bud,

  make: function () {
    this.bud.loaders.merge('postcss.options.plugins', [
      tailwindcss({
        config: this.bud.fs.project('tailwind.config.js'),
      }),
    ])

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
    const config: TailwindSupport.config = function (
      config: unknown,
    ): Bud {
      this.loaders.merge('postcss.options.plugins', [
        tailwindcss(config),
      ])

      return this
    }

    this.bud.apply('tailwind', config)

    /**
     * Handle conflicts between tailwind directives
     * and dart-sass/node-sass compilers
     */
    this.bud.options.set(
      'sass.sassOptions.processCssUrls',
      false,
    )
  },
})

export default TailwindSupport
