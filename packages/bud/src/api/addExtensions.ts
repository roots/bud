import type {Bud} from './types'

type AddExtensions = (this: Bud, extensions: string[]) => Bud

const addExtensions: AddExtensions = function (extensions) {
  extensions
    .map(ext => ext.replace(/^(\.)([^ .]+)?/, '$2'))
    .forEach(ext => {
      !this.options
        .get('webpack.resolve.extensions')
        .includes(`.${ext}`) &&
        this.options.set('webpack.resolve.extensions', [
          ...this.options.get('webpack.resolve.extensions'),
          `.${ext}`,
        ])
    })

  return this
}

export {addExtensions}
export type {AddExtensions}
