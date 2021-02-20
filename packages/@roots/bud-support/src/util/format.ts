import prettyFormat from 'pretty-format'

export const format: Format = (obj, options = {}): string =>
  prettyFormat(obj, {
    callToJSON: true,
    highlight: true,
    indent: 2,
    ...options,
  })

export type Format = (
  obj: unknown,
  options: Partial<prettyFormat.Options>,
) => string
