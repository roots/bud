import {flags} from '@oclif/command'

export interface log {
  ['log']: flags.IFlag<boolean>
  ['log.level']: flags.IFlag<string>
  ['log.papertrail']: flags.IFlag<boolean>
  ['log.secret']: flags.IFlag<Array<string>>
}

export const log: log = {
  ['log']: flags.boolean({
    description: 'log to console',
    default: true,
    allowNo: true,
  }),

  ['log.level']: flags.string({
    description:
      'set log verbosity. `v` is error level. `vv` is warning level. `vvv` is log level. `vvvv` is debug level.',
    default: 'vvv',
    options: ['v', 'vv', 'vvv', 'vvvv'],
  }),

  ['log.papertrail']: flags.boolean({
    allowNo: true,
    default: false,
    description: 'preserve logger output',
  }),

  ['log.secret']: flags.string({
    default: [process.cwd()],
    multiple: true,
    description: 'hide matching strings from logging output',
  }),
}
