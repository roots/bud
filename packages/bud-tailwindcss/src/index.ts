import {Bud, Plugin} from '@roots/bud-types'
import tailwind from 'tailwindcss'

const tailwindcss: Plugin = (bud: Bud) => ({
  /**
   * The bud container object.
   */
  bud,

  /**
   * The primary plugin action.
   */
  make: function () {
    /**
     * Set config.
     */
    this.bud.configs.set('tailwind', 'tailwind.config.js')

    /**
     * Set defaults.
     */
    this.bud.options.merge(
      'postcss.plugins.tailwind',
      tailwind({
        config: this.bud.configs.get('tailwind'),
      }),
    )

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
     * Configure tailwindcss support.
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
      this.options.merge('postcss.plugins', [tailwind(config)])
      return this
    })
  },
})

export {tailwindcss as default}
