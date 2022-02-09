import * as oclif from '@oclif/core'

export const build = {
  ['publicPath']: oclif.Flags.string({
    description: 'public path',
  }),
}
