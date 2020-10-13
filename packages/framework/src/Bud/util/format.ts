import prettyFormat from 'pretty-format'

const format = (obj: unknown, options = {}): string =>
  prettyFormat(obj, {
    callToJSON: true,
    highlight: true,
    indent: 2,
    ...options,
  })

export {format as default}
