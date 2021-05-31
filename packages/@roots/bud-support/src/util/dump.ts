import prettyFormat, {OptionsReceived} from 'pretty-format'

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

declare type Dump = (
  obj: unknown,
  options?: OptionsReceived,
) => void
