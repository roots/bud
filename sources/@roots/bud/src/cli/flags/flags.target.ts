import * as oclif from '@oclif/core'

import {Option} from './flags.interface'

export interface target {
  ['target']: Option<Array<string>>
}

export const target: target = {
  target: oclif.Flags.string({
    char: 't',
    description: 'limit compilation to this compiler',
    multiple: true,
    default: [],
  }),
}
