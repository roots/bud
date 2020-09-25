import prettyFormat from 'pretty-format'

export type Dump = (
  obj: unknown,
  options?: prettyFormat.OptionsReceived,
) => void

export const dump: Dump = (
  obj,
  options = {
    callToJSON: true,
    highlight: true,
    indent: 2,
  },
) => {
  console.log(prettyFormat(obj, options))
}
