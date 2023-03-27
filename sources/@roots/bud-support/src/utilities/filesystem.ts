import {BudError} from '../errors/errors.js'
import {Filesystem} from '../filesystem/index.js'

let filesystem: Filesystem

export const get = (basedir?: string) => {
  if (filesystem) return filesystem

  if (typeof basedir !== `string`)
    throw new BudError(
      `filesystem not initialized. basedir arg required for initialization.`,
    )

  filesystem = new Filesystem(basedir)

  return filesystem
}

export {Filesystem, filesystem}
