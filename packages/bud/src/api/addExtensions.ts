import {BudInterface} from '../'

export interface Fluent {
  (
    this: BudInterface,
    extensions: string | string[],
  ): BudInterface
}

/**
 * ## bud.addExtensions
 *
 * Add support for additional extensions.
 *
 * ```js
 * bud.addExtensions(['jsx', 'vue'])
 * ```
 */
export const addExtensions: Fluent = function (
  this: BudInterface,
  extensions: string | string[],
): BudInterface {
  const normalize = ext =>
    ext.replace(
      /^(\.)([^ .]+)?/,
      '$2',
    )(typeof extensions == 'string') &&
    mergeExt.bind(this)(normalize(extensions))(
      typeof extensions == 'object',
    ) &&
    (extensions as string[])
      .map(normalize)
      .map(ext => mergeExt.bind(this)(ext))

  return this
}

function mergeExt(this: BudInterface, ext: string): void {
  if (
    this.options
      .get('webpack.resolve.extensions')
      .includes(`.${ext}`)
  ) {
    return
  }

  this.options.merge('webpack.resolve.extensions', [
    ...this.options.get('webpack.resolve.extensions'),
    `.${ext}`,
  ])
}
