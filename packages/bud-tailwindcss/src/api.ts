import tailwind from 'tailwindcss'

/**
 * ## bud.tailwind
 *
 * Configure tailwindcss support
 *
 * ```js
 * bud.tailwind({config: bud.project('custom-tailwind.js')})
 * ```
 *
 * ```js
 * bud.tailwind(({theme}) => ({
 *  colors: {},
 *  // ...
 * }))
 * ```
 */
const configTailwind = function (config: any) {
  this.options.set('postcss', {
    ...this.options.get('postcss'),
    plugins: [
      ...this.options.get('postcss.plugins'),
      tailwind(config),
    ],
  })

  return this
}

export default configTailwind
