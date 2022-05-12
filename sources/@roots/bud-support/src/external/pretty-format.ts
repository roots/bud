import prettyFormat, {OptionsReceived} from 'pretty-format'

export const format = (
  obj,
  options: OptionsReceived = {
    callToJSON: true,
    highlight: false,
    indent: 2,
  },
) => prettyFormat(obj, options)

export {prettyFormat}
export {PrettyFormatOptions} from 'pretty-format'
