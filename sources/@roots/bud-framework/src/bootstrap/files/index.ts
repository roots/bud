import type * as esbuild from '@roots/bud-support/esbuild'
import type {Filesystem} from '@roots/bud-support/filesystem'
import type {InspectResult} from '@roots/filesystem/filesystem'

import {builtinModules} from 'node:module'
import {join, parse} from 'node:path'

import {get as getPaths} from '@roots/bud-framework/bootstrap/paths'
import * as filesystem from '@roots/bud-support/filesystem'
import _get from '@roots/bud-support/get'
import logger from '@roots/bud-support/logger'
import omit from '@roots/bud-support/omit'
import _set from '@roots/bud-support/set'

const moduleExtensions = [`.js`, `.cjs`, `.mjs`, `.ts`, `.cts`, `.mts`]
const jsonExtensions = [`.json`, `.json5`, `.yml`, `.yaml`]

let files: Array<string>
let fs: Filesystem
let data: Record<string, any>
let paths: ReturnType<typeof getPaths>
let transformer: esbuild.transformer

interface File extends ReturnType<typeof parse> {
  bud: boolean
  local: boolean
  module?: () => Promise<any>
  name: string
  path: string
  sha1: string
  target: `base` | `development` | `production`
  type: `file` | `json` | `module` | `symlink`
}

let basedir: string

/**
 * Get configuration files from project
 *
 * @notes
 * Returns cached data if available.
 *
 * @param basedir - project root
 */
const get = async (fromDirectory: string) => {
  basedir = fromDirectory

  if (data && Object.entries(data).length) {
    logger.scope(`fs`).info(`Using existing instance data`)
    return data
  }

  files = []
  data = {}

  fs = filesystem.get(basedir)
  paths = getPaths(basedir)

  await Promise.all([
    fs
      .list(basedir)
      .then(res => files.push(...(res?.filter(Boolean) ?? []))),
    fs
      .list(join(basedir, `config`))
      .then(res =>
        files.push(
          ...((res?.filter(Boolean) ?? []).map(file =>
            join(`config`, file),
          ) ?? []),
        ),
      ),
    fs
      .list(join(basedir, `.config`))
      .then(res =>
        files.push(
          ...((res?.filter(Boolean) ?? []).map(file =>
            join(`.config`, file),
          ) ?? []),
        ),
      ),
    fs
      .list(join(basedir, `bud`))
      .then(res =>
        files.push(
          ...((res?.filter(Boolean) ?? []).map(file =>
            join(`bud`, file),
          ) ?? []),
        ),
      ),
    fs
      .list(join(basedir, `.bud`))
      .then(res =>
        files.push(
          ...((res?.filter(Boolean) ?? []).map(file =>
            join(`.bud`, file),
          ) ?? []),
        ),
      ),
  ]).catch(error => {
    throw error
  })

  await Promise.all(files.map(getFileInfo)).catch(error => {
    throw error
  })

  return data
}

/**
 * Get value for a given config file
 */
async function getFileInfo(filename: string) {
  if (filename?.endsWith(`.lock`) || filename?.includes(`-lock`)) {
    logger.info(`Skipping`, filename, `(lockfile)`)
    return
  }

  if (filename === `composer.json`) {
    logger.info(`Skipping`, filename, `(php manifest)`)
    return
  }

  const inspect = await fs.inspect(filename, {
    absolutePath: true,
    checksum: `sha1`,
    symlinks: `follow`,
  })
  if (!isNormalInspectResult(inspect)) return

  const parsed = parse(filename)
  const file: File = {
    ...omit(inspect, `absolutePath`, `type`, `filename`),
    bud: inspect.name.includes(`bud`),
    local: inspect.name.includes(`local`),
    path: inspect.absolutePath,
    target: getFileTarget(inspect),
    type: getFileType(inspect, parsed),
    ...parsed,
  }

  /**
   * Static config files
   */
  if (file.type === `file` || file.type === `json`) {
    file.module = async () => await fs.read(file.path)
  }

  /**
   * Import dynamic config files
   */
  if (file.type === `module`) {
    file.module = async () => {
      const current = await fs
        .inspect(file.path, {
          absolutePath: true,
          checksum: `sha1`,
          symlinks: `follow`,
        })
        .catch(error => {
          throw error
        })

      if (!isNormalInspectResult(current))
        throw new Error(`Problem inspecting ${file.name} (${file.path})`)

      /**
       * Handle non-typescript files using native esm loader
       */
      if ([`.cjs`, `.js`, `.mjs`].includes(file.ext)) {
        /**
         * bust the cache with the {@link current} sha1
         */
        const path = `${file.path}?v=${current.sha1}`
        const value = await import(path).catch(error => {
          throw error
        })

        logger.scope(`fs`).info(`loading ${file.name}`, value)

        return value?.default ?? value // returning early here
      }

      // the rest of the function is for files which require compilation

      const outfile = join(
        paths.storage,
        `configs`,
        file.base,
        `${current.sha1}${file.ext.replace(/(.*)ts$/, `$1mjs`)}`,
      )

      const modified = current.sha1 !== file.sha1
      const uncompiled = !(await fs.exists(outfile))

      if (modified || uncompiled) {
        uncompiled && logger.log(file.name, `has not been compiled yet`)
        modified &&
          logger.log(file.name, `has been modified since last compiled`)

        // Update the hash to the current state
        file.sha1 = current.sha1

        await esTransform({file, outfile}).catch(error => {
          throw error
        })
      }

      const tmpfile = join(
        basedir,
        file.dir,
        `.${file.name}${file.ext.replace(/(.*)ts$/, `$1mjs`)}`,
      )

      logger.scope(`fs`).info(`copying ${outfile} to tmpfile:`, tmpfile)
      await fs
        .copy(outfile, tmpfile, {overwrite: true})
        .catch(makeCopyError(tmpfile))

      logger.scope(`fs`).info(`importing tmpfile:`, tmpfile)
      const value = await import(tmpfile).catch(
        makeTmpFileImportError(tmpfile),
      )

      logger.scope(`fs`).info(`removing tmpfile:`, tmpfile)
      await fs.remove(tmpfile).catch(makeRemoveError(tmpfile))

      return value?.default ?? value
    }
  }

  Object.assign(data, {[file.name]: file})
}

async function esTransform({
  file,
  outfile,
}: {
  file: File
  outfile: string
}): Promise<any> {
  if (!transformer) {
    transformer = await import(`@roots/bud-support/esbuild`)
      .then(
        async ({getImplementation}) => await getImplementation(file.path),
      )
      .catch(error => {
        throw error
      })
  }

  await transformer.build({
    absWorkingDir: basedir,
    allowOverwrite: true,
    bundle: true,
    entryPoints: [file.path],
    external: [`@roots/bud`, `node:*`, ...builtinModules],
    format: `esm`,
    inject: [`@roots/bud-support/cjs-shim`],
    outfile,
    platform: `node`,
  })
}

function getFileType(
  file: {type: `file` | `symlink`},
  {ext}: {ext: string},
): `file` | `json` | `module` | `symlink` {
  if (moduleExtensions.includes(ext)) return `module`
  if (jsonExtensions.includes(ext)) return `json`
  return file.type
}

function getFileTarget(file: {name?: string}) {
  if (file.name?.includes(`production`) || file.name?.includes(`prod`))
    return `production`

  if (file.name?.includes(`development`) || file.name?.includes(`dev`))
    return `development`

  return `base`
}

function isNormalInspectResult(file?: InspectResult): file is {
  absolutePath: string
  name: string
  sha1: string
  type: `file` | `symlink`
} & InspectResult {
  if (file === undefined) return false
  if (file.sha1 === undefined) return false
  if (file.name === undefined) return false
  if (file.absolutePath === undefined) return false
  if ([`dir`, false, undefined].includes(file.type)) return false

  return true
}

const makeTmpFileImportError = (file: string) => async (error: Error) => {
  await fs.remove(file).catch(makeRemoveError(file))
  throw error
}
const makeRemoveError = (file: string) => (error: Error) => {
  logger.scope(`fs`).error(`error removing file`, file, error)
  throw error
}
const makeCopyError = (file: string) => async (error: Error) => {
  logger.scope(`fs`).error(`error copying to file:`, file, error)
  await fs.remove(file).catch(makeRemoveError(file))
  throw error
}

export {data, get}
