import * as oclif from '@oclif/core'

export interface base {
  help: any
  version: any
}

export const base: base = {
  help: oclif.Flags.help({char: 'h'}),
  version: oclif.Flags.version(),
}
