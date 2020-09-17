import BudInterface from '../Bud'

/**
 * ## bud.copy
 *
 * Copy a file.
 *
 * ```js
 * bud.copy(
 *   bud.src('images/image.png'),
 *   bud.dist('image.png'),
 * )
 * ```
 */
export type Copy = (
  this: BudInterface,
  from: string,
  to: string,
) => BudInterface

const copy: Copy = function (
  this: BudInterface,
  from: string,
  to = '',
): BudInterface {
  this.options.set('webpack.plugins.copy.patterns', [
    ...this.options.get('webpack.plugins.copy.patterns'),
    {
      from,
      to,
    },
  ])

  return this
}

export {copy as default}
