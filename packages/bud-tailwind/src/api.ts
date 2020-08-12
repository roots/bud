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
const configTailwind = function (this: any, config: any) {
  this.options.set('postCss', {
    ...this.options.postCss,
    plugins: [...this.options.get('postCss').plugins, tailwind(config)],
  })

  return this
}

export default configTailwind
