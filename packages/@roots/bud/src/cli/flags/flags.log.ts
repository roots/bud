import * as oclif from '@oclif/core'

import {Boolean, Option} from './flags.interface'

export interface log {
  ['log']: Boolean
  ['log.level']: Option<string>
  ['log.papertrail']: Boolean
  ['log.secret']: Option<Array<string>>
  ['log.min']: Boolean
}

export const log: log = {
  ['log']: oclif.Flags.boolean({
    allowNo: true,
    description: 'log to console',
    default: true,
  }),

  ['log.level']: oclif.Flags.string({
    description:
      'set log verbosity. `v` is error level. `vv` is warning level. `vvv` is log level. `vvvv` is debug level.',
    default: 'vvv',
    options: ['v', 'vv', 'vvv', 'vvvv'],
  }),

  ['log.papertrail']: oclif.Flags.boolean({
    default: true,
    allowNo: true,
    description: 'preserve logger output',
  }),

  ['log.min']: oclif.Flags.boolean({
    default: true,
    allowNo: true,
    description: 'remove formatting from logged objects',
  }),

  ['log.secret']: oclif.Flags.string({
    default: [process.cwd()],
    multiple: true,
    description: 'hide matching strings from logging output',
  }),
}
