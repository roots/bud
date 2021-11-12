import {flags} from '@oclif/command'

export const location = {
  ['location.src']: flags.string({
    description: 'directory containing source assets',
  }),

  ['location.dist']: flags.string({
    description: 'directory to emit assets to',
  }),

  ['location.project']: flags.string({
    description: 'project directory',
  }),

  ['location.publicPath']: flags.string({
    description: 'public path',
  }),
}
