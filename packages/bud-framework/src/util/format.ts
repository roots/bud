import prettyFormat from 'pretty-format'

const format = (obj: any, options = {}): string =>
  prettyFormat(obj, {
    callToJSON: true,
    highlight: true,
    indent: 2,
    ...options,
  })

export {format as default}
