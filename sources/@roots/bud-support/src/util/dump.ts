import prettyFormat, {OptionsReceived} from 'pretty-format'

export const dump: Dump = (
  obj,
  options = {
    callToJSON: true,
    highlight: true,
    indent: 2,
  },
) => {
  process.stdout.write(prettyFormat(obj, options))
}

declare type Dump = (obj: unknown, options?: OptionsReceived) => void
