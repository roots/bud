/**
 * ## bud.postCss
 *
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * ```js
 * bud.postCss({
 *   plugins: [
 *    require('astroturf'),
 *   ],
 * })
 * ```
 */
const postCss: PostCss = function ({enabled = true, ...options}) {
  this.features.postCss = enabled

  if (this.features.postCss) {
    this.options.postCss = {
      ...this.options.postCss,
      ...options,
    }
  }

  return this
}

export {postCss}

import type {bud} from '../'

export interface PostCssInterface {
  options?: {
    enabled?: boolean,
    plugins?: any[],
  }
}

export type PostCss = (PostCssInterface) => bud;
