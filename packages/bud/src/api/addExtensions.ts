import {BudInterface} from '../Bud'

/**
 * ## bud.addExtensions
 *
 * Add support for additional extensions.
 *
 * ```js
 * bud.addExtensions(['jsx', 'vue'])
 * ```
 */
export type AddExtensions = (
  this: BudInterface,
  extensions: string[],
) => BudInterface

const addExtensions: AddExtensions = function (extensions) {
  extensions
    .map(ext => ext.replace(/^(\.)([^ .]+)?/, '$2'))
    .forEach(ext => {
      !this.options
        .get('webpack.resolve.extensions')
        .includes(`.${ext}`) &&
        this.options.merge('webpack.resolve.extensions', [
          ...this.options.get('webpack.resolve.extensions'),
          `.${ext}`,
        ])
    })

  return this
}

export {addExtensions as default}
