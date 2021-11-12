import {flags} from '@oclif/command'

export interface base {
  help: any
  version: any
}

export const base: base = {
  help: flags.help({char: 'h'}),
  version: flags.version(),
}
