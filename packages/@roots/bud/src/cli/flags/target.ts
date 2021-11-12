import {flags} from '@oclif/command'

export const target = {
  target: flags.string({
    char: 't',
    description: 'limit compilation to this compiler',
    multiple: true,
    default: [],
  }),
}
