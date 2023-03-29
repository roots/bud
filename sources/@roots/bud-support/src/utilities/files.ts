import {join} from 'node:path'

import omit from '@roots/bud-support/lodash/omit'
import type {InspectResult} from 'fs-jetpack/types.js'
import {transform} from 'sucrase'

import {BudError, FileReadError, ImportError} from '../errors/index.js'
import type {Filesystem} from '../filesystem/index.js'
import isEqual from '../lodash/isEqual/index.js'
import set from '../lodash/set/index.js'
import * as filesystem from './filesystem.js'
import logger from './logger.js'
import {get as getPaths} from './paths.js'

let fs: Filesystem
let data: Record<string, any> = {}
let paths: ReturnType<typeof getPaths>

/**
 * Get configuration files from project
 *
 * @notes
 * Returns cached data if available.
 *
 * @param basedir - project root
 */
const get = async (basedir: string) => {
  if (data && Object.entries(data).length) {
    logger.scope(`fs`).info(`Using cached filesystem data`)
    return data
  }

  logger.scope(`fs`).time(`Initializing filesystem`)

  let files: Array<string> = []

  fs = filesystem.get(basedir)
  paths = getPaths(basedir)

  await fs
    .list(basedir)
    .then(res => files.push(...(res?.filter(Boolean) ?? [])))

  await fs
    .list(join(basedir, `config`))
    .then(res =>
      files.push(
        ...((res?.filter(Boolean) ?? []).map(file =>
          join(`config`, file),
        ) ?? []),
      ),
    )

  if (!files?.length) return

  await Promise.all(files.map(fetchFileInfo))

  if (await fs.exists(join(paths.cache, `checksum.yml`))) {
    const checksums = await fs.read(join(paths.cache, `checksum.yml`))
    if (!checksums) {
      await fs.remove(join(paths.cache, `checksum.yml`))
      return data
    }

    const match =
      checksums[`package.json`] === getValue(`package.json`, `sha1`)

    if (!match) {
      try {
        logger.await(`removing old module resolutions`)
        await fs.remove(join(paths.cache, `resolutions.yml`))
        logger.success(`removing old module resolutions`)
      } catch (err) {
        logger.error(`error clearing outdated resolutions`, err)
      }
    }
  }

  logger.scope(`fs`).timeEnd(`Initializing filesystem`)

  return data
}

/**
 * Get value for a given config file
 *
 * @param name - file name
 */
async function fetchFileInfo(name: string) {
  let file: InspectResult | undefined
  if (name.endsWith(`.lock`) || name.includes(`-lock`)) return

  file = await fs.inspect(name, {
    mode: true,
    absolutePath: true,
    symlinks: `follow`,
    checksum: `sha1`,
  })

  if (!file) return

  logger.scope(`fs`).info(`Reading project file: ${name}`)
  set(data, [file.name], omit(file, `absolutePath`))
  set(data, [file.name, `path`], file.absolutePath)
  set(data, [file.name, `file`], isEqual(file.type, `file`))
  set(data, [file.name, `dir`], isEqual(file.type, `dir`))
  set(data, [file.name, `symlink`], isEqual(file.type, `symlink`))
  set(data, [file.name, `local`], file.name.includes(`local`))
  set(
    data,
    [file.name, `bud`],
    file.name.includes(`bud`) && file.type === `file`,
  )
  set(
    data,
    [file.name, `type`],
    file.name.includes(`production`)
      ? `production`
      : file.name.includes(`development`)
      ? `development`
      : `base`,
  )
  set(
    data,
    [file.name, `extension`],
    getValue(file.name, `file`) ? file.name.split(`.`).pop() : null,
  )
  set(
    data,
    [file.name, `dynamic`],
    isDynamicConfig(getValue(file.name, `extension`)),
  )
  set(
    data,
    [file.name, `static`],
    isStaticConfig(getValue(file.name, `extension`)),
  )

  /**
   * Static config files
   */
  try {
    if (getValue(file.name, `static`)) {
      set(
        data,
        [file.name, `module`],
        await fs.read(getValue(file.name, `path`)),
      )
    }
  } catch (cause) {
    handleBudError(FileReadError, cause, file)
  }

  /**
   * Handle typescript transforms
   */
  getValue(file.name, `extension`)?.endsWith(`ts`) &&
    (await transformTypescriptConfig(file))

  /**
   * Import dynamic config files
   */
  try {
    if (getValue(file.name, `dynamic`)) {
      const code = await import(
        getValue(file.name, `path`).replace(`.ts`, `.cjs`)
      ).then(mod => mod?.default ?? mod)
      set(data, [file.name, `module`], code)
    }
  } catch (cause) {
    handleBudError(ImportError, cause, file)
  }

  /**
   * Cleanup transformed typescript configs
   */
  getValue(file.name, `extension`)?.endsWith(`ts`) &&
    (await cleanupTypescriptConfig(file))
}

/**
 * Returns true if the file is a static config file
 *
 * @param extension - file extension
 * @returns boolean
 */
function isStaticConfig(extension?: string | null) {
  if (!extension) return false
  return [`json`, `yml`, `yaml`].includes(extension)
}

/**
 * Returns true if the file is a dynamic config file
 *
 * @param extension - file extension
 * @returns boolean
 */
function isDynamicConfig(extension?: string | null) {
  if (!extension) return false
  return [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].includes(extension)
}

/**
 * Get value for a given config file
 * or a given property of a given config file
 *
 * @param name
 * @param prop
 * @returns
 */
function getValue(name: string, prop?: string) {
  if (!prop) return data[name]
  return data[name]?.[prop]
}

/**
 * Transform typescript config files
 * to commonjs
 *
 * @param file - file to transform
 * @returns void
 */
async function transformTypescriptConfig(file: Record<string, any>) {
  try {
    const code = await fs.read(getValue(file.name, `path`), `utf8`)
    await fs.write(
      getValue(file.name, `path`).replace(`.ts`, `.cjs`),
      transform(code, {
        transforms: [`typescript`, `imports`],
      }).code,
    )
  } catch (cause) {
    handleBudError(ImportError, cause, file)
  }
}

async function cleanupTypescriptConfig(file: Record<string, any>) {
  await fs.remove(getValue(file.name, `path`).replace(`.ts`, `.cjs`))
}

/**
 * Handle bud errors
 *
 * @param ErrorClass - Error class to throw
 * @param cause - Caught exception
 * @param file - File that caused the error
 */
async function handleBudError(
  ErrorClass: typeof FileReadError | typeof ImportError,
  cause: unknown,
  file: Record<string, any>,
) {
  /**
   * Cleanup transformed typescript configs
   * if error occured
   */
  await cleanupTypescriptConfig(file)

  /**
   * Construct {@link BudError} object
   */
  const error = new ErrorClass(`${file.name} could not be written`, {
    props: {
      origin: BudError.normalize(cause),
    },
  })

  /* Throw if error occured in a bud config */
  if (getValue(file.name, `bud`)) throw error

  /* Otherwise, just log it */
  logger
    .scope(`fs`, file.name)
    .error(
      `This file causes an exception when ${
        file.dynamic ? `imported` : `read`
      }`,
      `\nSince ${file.name} does not appear to be a bud configuration file, bud.js is not throwing.`,
      `\nError follows:`,
      cause,
    )
}

export {get, data}
