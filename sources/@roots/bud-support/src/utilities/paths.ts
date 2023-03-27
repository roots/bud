import {createHash} from 'node:crypto'
import {join} from 'node:path'

import temporaryDirectory from 'temp-dir'

import {BudError} from '../errors/errors.js'
import args from './args.js'
import * as env from './env.js'

interface paths {
  basedir: string
  tmp: string
  hash: string
}

let paths: paths

const get = (directory?: string): paths => {
  if (paths) return paths

  paths = {
    basedir: ``,
    tmp: ``,
    hash: ``,
  }

  if (!directory)
    throw new BudError(
      `paths: directory is required if paths not already initialized`,
      {
        props: {
          details: `This error is thrown when the paths utility is called without a directory argument and the paths have not already been initialized. This is most likely a problem with bud.js.`,
        },
      },
    )

  const basearg =
    args?.cwd ?? args?.basedir ?? env.get(directory)?.APP_BASE_PATH

  paths.basedir = basearg ? join(directory, basearg) : directory
  paths.hash = createHash(`sha1`).update(paths.basedir).digest(`base64`)
  paths.tmp = join(temporaryDirectory, `bud`, paths.hash)

  return paths
}

export {get}
