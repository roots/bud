import {Filesystem} from '../filesystem/index.js'
import logger from './logger.js'

let filesystem: Filesystem

export const get = (basedir?: string) => {
  if (filesystem) return filesystem
  if (!basedir)
    logger.error(
      `filesystem not initialized. basedir arg required for initialization.`,
    )

  filesystem = new Filesystem(basedir as string)

  return filesystem
}

export {Filesystem, filesystem}
