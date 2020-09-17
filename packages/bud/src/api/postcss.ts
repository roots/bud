import {BudInterface} from '../Bud'

/**
 * ## bud.postcss
 *
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js
 * file in the project root, either alongside or in
 * lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved
 * in favor of the project config file.
 *
 * ```js
 * bud.postCss({
 *   plugins: [
 *    require('astroturf'),
 *   ],
 * })
 * ```
 */
export type PostCss = (
  this: BudInterface,
  options?: {
    plugins?: any[]
  },
) => BudInterface

const postcss: PostCss = function ({plugins}) {
  this.features.set('postcss', true)

  plugins &&
    this.options.set('postcss.plugins', [
      ...this.options.get('postcss.plugins'),
      ...plugins,
    ])

  return this
}

export {postcss as default}
