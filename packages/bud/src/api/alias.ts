import {Loose} from '@roots/bud-framework'
import BudInterface from '../Bud'

/**
 * ## bud.alias
 *
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 *
 * Having defined this alias:
 *
 * ```js
 * bud.alias({'scripts': bud.src('scripts')})
 * ```
 *
 * You can now reference scripts against that alias in your import statements:
 *
 * ```js
 * import 'scripts/myScript' // replacing '../../myScript'
 * ```
 **/
export type Alias = (
  this: BudInterface,
  aliases: Loose,
) => BudInterface

const alias: Alias = function (
  this: BudInterface,
  aliases: Loose,
) {
  this.options.set('webpack.resolve.alias', {
    ...this.options.get('webpack.resolve.alias'),
    ...this.hooks.filter('api.alias', aliases),
  })

  return this
}

export {alias as default}
