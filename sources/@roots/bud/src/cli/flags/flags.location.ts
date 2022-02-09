import * as oclif from '@oclif/core'
import path from 'path'

import {Option, Parser} from './flags.interface'

/**
 *
 * @param value -
 * @returns
 */
const parse: Parser<string> = async (value: string): Promise<string> => {
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

export interface location {
  ['location.project']: Option<string>
  ['location.src']: Option<string>
  ['location.dist']: Option<string>
  ['location.storage']: Option<string>
  ['location.modules']: Option<string>
}

export const location: location = {
  ['location.src']: oclif.Flags.string({
    description: 'source directory',
    parse,
  }),

  ['location.dist']: oclif.Flags.string({
    description: 'distribution directory',
    parse,
  }),

  ['location.project']: oclif.Flags.string({
    description: 'repo root path',
    parse,
  }),

  ['location.storage']: oclif.Flags.string({
    description: 'storage directory',
    parse,
  }),

  ['location.modules']: oclif.Flags.string({
    description: 'public path',
    parse,
  }),
}
