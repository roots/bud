import {Api} from '@roots/bud-types'

const addExtensions: Api.AddExtensions = function (extensions) {
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

export {addExtensions}
