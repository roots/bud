import {flags} from '@oclif/command'
import path from 'path'

export interface location {
  ['location.project']: flags.IFlag<string>
  ['location.src']: flags.IFlag<string>
  ['location.dist']: flags.IFlag<string>
  ['location.publicPath']: flags.IFlag<string>
  ['location.storage']: flags.IFlag<string>
  ['location.modules']: flags.IFlag<string>
}

const parse = (value: string) => {
  if (value.startsWith('~')) {
    return value.replace('~', process.env.HOME || '')
  } else if (value.startsWith('@')) {
    const fragment = value.replace('@', '')
    return path.resolve(process.cwd(), fragment)
  } else if (!value.startsWith('/')) {
    return path.resolve(process.cwd(), value)
  }

  return value
}

export const location: location = {
  ['location.src']: flags.string({
    description: 'source directory',
    parse,
  }),

  ['location.dist']: flags.string({
    description: 'distribution directory',
    parse,
  }),

  ['location.project']: flags.string({
    description: 'repo root path',
    parse,
  }),

  ['location.publicPath']: flags.string({
    description: 'public path',
  }),

  ['location.storage']: flags.string({
    description: 'storage directory',
    parse,
  }),

  ['location.modules']: flags.string({
    description: 'public path',
    parse,
  }),
}
