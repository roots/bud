import {lodash as _} from '@roots/bud-support'

export const use: Framework.API.Use = function (
  extensions:
    | string
    | string[]
    | [
        string,
        (
          | Framework.Extension
          | ((bud: Framework.Bud) => Framework.Extension)
        ),
      ]
    | [
        string,
        (
          | Framework.Extension
          | ((bud: Framework.Bud) => Framework.Extension)
        ),
      ][],
) {
  if (_.isString(extensions)) {
    this.extensions.use(extensions)

    return this
  }

  ensureIterable(extensions).forEach(ext => {
    const isTuple = _.isArray(ext)

    !isTuple
      ? this.extensions.use(ext)
      : this.extensions.register(...ext)
  })

  return this
}

function ensureIterable(extensions) {
  return _.isArray(extensions) &&
    extensions[0] &&
    extensions[1] &&
    !_.isArray(extensions[0]) &&
    _.isObject(extensions[1]) &&
    !_.isArrayLike(extensions[1])
    ? [extensions]
    : extensions
}
