import {Plugin} from '@roots/bud-typings'
import tailwind from 'tailwindcss'

const tailwindcss: Plugin = () => ({
  make: function () {
    this.bud.apply('tailwind', function (config: any) {
      this.options.set('postcss', {
        ...this.options.get('postcss'),
        plugins: [
          ...this.options.get('postcss.plugins'),
          tailwind(config),
        ],
      })

      return this
    })

    this.bud.options.set('postcss.plugins', [
      ...this.bud.options.get('postcss.plugins'),
      tailwind({
        config: this.bud.project('tailwind.config.js'),
      }),
    ])

    this.bud.options.set('sass.sassOptions', {
      processCssUrls: false,
      ...this.bud.options.get('sass.sassOptions'),
    })
  },
})

export {tailwindcss}
