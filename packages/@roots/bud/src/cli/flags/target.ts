import {flags} from '@oclif/command'

export interface target {
  ['target']: flags.IFlag<Array<string>>
}

export const target: target = {
  target: flags.string({
    char: 't',
    description: 'limit compilation to this compiler',
    multiple: true,
    default: [],
  }),
}
