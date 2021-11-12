import {flags} from '@oclif/command'

export const base = {
  help: flags.help({char: 'h'}),
  version: flags.version(),
}
