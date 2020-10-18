export const addExtensions: Framework.API.AddExtensions = function (
  this: Framework.Bud,
  extensions,
) {
  typeof extensions == 'string'
    ? merge.bind(this)(normalize(extensions))
    : extensions
        .map(normalize)
        .map((ext: string) => merge.bind(this)(ext))

  return this
}

/**
 * Normalize extension (leading dot, lowercase)
 */
function normalize(ext: string): string {
  return `.${ext.replace(/^(\.)([^ .]+)?/, '$2').toLowerCase()}`
}

/**
 * Merge extensions
 */
function merge(ext: string): void {
  return !this.build.config
    .get('resolve.extensions')
    .includes(ext)
    ? this.build.config.merge('resolve.extensions', [ext])
    : null
}
