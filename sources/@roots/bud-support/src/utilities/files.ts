import type * as esbuild from '@roots/bud-support/esbuild'

import omit from '@roots/bud-support/lodash/omit'
import {randomUUID} from 'node:crypto'
import {dirname, join, parse} from 'node:path'

import type {Filesystem} from '../filesystem/index.js'

import {BudError, FileReadError, ImportError} from '../errors/index.js'
import _get from '../lodash/get/index.js'
import isEqual from '../lodash/isEqual/index.js'
import _set from '../lodash/set/index.js'
import * as filesystem from './filesystem.js'
import logger from './logger.js'
import {get as getPaths} from './paths.js'

const DYNAMIC_EXTENSIONS = [`.js`, `.cjs`, `.mjs`, `.ts`, `.cts`, `.mts`]
const STATIC_EXTENSIONS = [`.json`, `.json5`, `.yml`, `.yaml`]
const COMPATIBLE_EXTENSIONS = [...DYNAMIC_EXTENSIONS, ...STATIC_EXTENSIONS]

const uid = randomUUID() // prevents conflicting fs operations when testing

let transformer: esbuild.transformer
let fs: Filesystem
let data: Record<string, any>
let paths: ReturnType<typeof getPaths>
let files: Array<string>

interface File {
  bud?: boolean
  dir?: boolean
  dynamic?: boolean
  extension?: string
  file?: boolean
  local?: boolean
  module?: Function | Record<string, any>
  name: string
  parsed: ReturnType<typeof parse>
  path: string
  sha1?: string
  static?: boolean
  symlink?: boolean
  type?: `base` | `development` | `production`
}

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
    logger.scope(`fs`).info(`Using existing instance data`)
    return data
  } else {
    logger.scope(`fs`).time(`Initializing filesystem`)
    fs = filesystem.get(basedir)
    paths = getPaths(basedir)
    files = []
    data = {}
  }

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

  await Promise.all(files.map(fetchFileInfo)).then(() => {
    files = files.filter(Boolean)
  })

  await verifyResolutionCache()

  logger.scope(`fs`).timeEnd(`Initializing filesystem`)

  return data
}

/**
 * Get value for a given config file
 *
 * @param name - file name
 */
async function fetchFileInfo(filename: string) {
  const parsed = parse(filename)
  if (filename?.endsWith(`.lock`) || filename?.includes(`-lock`)) {
    logger.info(`Skipping`, filename, `(lockfile)`)
    return
  }

  if (filename === `composer.json`) {
    logger.info(`Skipping`, filename, `(php manifest)`)
    return
  }

  if (parsed.ext && !COMPATIBLE_EXTENSIONS.includes(parsed.ext)) {
    logger.info(`Skipping`, filename, `(unknown extension)`)
    return
  }

  const inspect = await fs.inspect(filename, {
    absolutePath: true,
    checksum: `sha1`,
    mode: true,
    symlinks: `follow`,
  })

  if (!inspect?.name || inspect.type === `dir` || !inspect.absolutePath) {
    logger.info(
      `Skipping`,
      inspect?.name,
      inspect?.type,
      inspect?.absolutePath,
    )
    return
  }

  const file: File = {
    ...omit(inspect, `absolutePath`),
    bud: inspect.name.includes(`bud`) && inspect.type === `file`,
    dir: isEqual(inspect.type, `dir`),
    file: isEqual(inspect.type, `file`),
    local: inspect.name.includes(`local`),
    parsed: parse(inspect.absolutePath),
    path: inspect.absolutePath,
    symlink: isEqual(inspect.type, `symlink`),
    type: getFileType(inspect),
  }

  Object.assign(file, {
    dynamic: isDynamicConfig(file),
    extension: file.parsed?.ext.replace(`.`, ``),
    static: isStaticConfig(file),
  })

  /**
   * Static config files
   */
  if (file.static && file.file) {
    try {
      file.module = await fs.read(file.path)
    } catch (cause) {
      handleBudError(FileReadError, cause, file)
    }
  }

  /**
   * Import dynamic config files
   */
  if (file.dynamic && file.file) {
    const tmpDir = dirname(file.path)
    const tmpPath = join(
      tmpDir,
      `${file.sha1}${uid}${file.parsed.ext.replace(`ts`, `js`)}`,
    )
    const cachePath = join(
      paths.storage,
      `conf`,
      `${file.sha1}${file.parsed.ext.replace(`ts`, `js`)}`,
    )

    try {
      const getModuleValue = async () => {
        try {
          logger.scope(`fs`).time(`loading ${file.name}`)

          if ([`.cts`, `.mts`, `.ts`].includes(file.parsed.ext)) {
            if (!(await fs.exists(cachePath))) {
              logger
                .scope(`fs`)
                .log(
                  `${file.name} does not exist in cache. running transform.`,
                  `file will be cached to ${cachePath}`,
                )

              await transformConfig({cachePath, file})
            }

            logger.scope(`fs`).info(`copying`, cachePath, `to`, tmpPath)
            await fs.copy(cachePath, tmpPath, {overwrite: true})

            logger.scope(`fs`).info(`importing`, tmpPath)
            const importValue = await import(tmpPath)

            const value = importValue?.default ?? importValue

            logger.scope(`fs`).info(`removing`, tmpPath)
            await fs.remove(tmpPath)

            return value
          }

          const importValue = await import(file.path)

          logger.scope(`fs`).timeEnd(`loading ${file.name}`)

          return importValue?.default ?? importValue
        } catch (cause) {
          await fs.remove(tmpPath)
          handleBudError(ImportError, cause, file)
        }
      }

      if (file.bud) {
        file.module = async () => await getModuleValue()
      } else {
        file.module = await getModuleValue()
      }
    } catch (cause) {
      await fs.remove(tmpPath)
      handleBudError(ImportError, cause, file)
    }
  }

  Object.assign(data, {[file.name]: file})
}

/**
 * Transform import
 *
 * @param file - File to transform
 * @param cachePath - Path to cache file
 */
async function transformConfig({
  cachePath,
  file,
}: {
  cachePath: string
  file: File
}): Promise<any> {
  logger.time(`compiling ${file.name}`)

  if (!transformer) {
    transformer = await import(`../esbuild/index.js`).then(
      async ({getImplementation}) => await getImplementation(file.path),
    )
  }

  await transformer.build({
    entryPoints: [file.path],
    outfile: cachePath,
    platform: `node`,
  })

  file.path = cachePath

  logger.timeEnd(`compiling ${file.name}`)
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
  file: File,
) {
  if (typeof file.name !== `string`) return
  if (typeof file.dynamic !== `boolean`) return

  /**
   * Construct {@link BudError} object
   */
  const error = new ErrorClass(file.name, {
    props: {
      origin: BudError.normalize(cause),
    },
  })

  /* Throw if error occured in a bud config */
  if (file.name?.includes(`bud`)) throw error

  /* Otherwise, just log it */
  logger
    .scope(`fs`, file.name)
    .warn(
      `${file.name} causes an exception when ${
        file.dynamic ? `imported` : `read`
      }.`,
      `\nSince ${file.name} does not appear to be a bud configuration file, bud.js is not throwing. Original error follows:`,
      `\n\n${error.origin}`,
    )
}

/**
 * Returns true if the file is a static config file
 *
 * @param extension - file extension
 * @returns boolean
 */
function isStaticConfig(file?: File) {
  if (!file?.parsed?.ext) return false
  return STATIC_EXTENSIONS.includes(file.parsed.ext)
}

/**
 * Returns true if the file is a dynamic config file
 *
 * @param extension - file extension
 * @returns boolean
 */
function isDynamicConfig(file?: File) {
  if (!file?.parsed?.ext) return false
  return DYNAMIC_EXTENSIONS.includes(file.parsed.ext)
}

/**
 * Upate checksums for found configs
 * @returns
 */
async function verifyResolutionCache() {
  const removeResolutions = async () => {
    try {
      logger.await(`removing old module resolutions`)
      await fs.remove(join(paths.storage, `resolutions.yml`))
      logger.success(`removing old module resolutions`)
    } catch (err) {
      logger.error(`error clearing outdated resolutions`, err)
    }
  }

  if (await fs.exists(join(paths.storage, `checksum.yml`))) {
    try {
      const checksums = await fs.read(join(paths.storage, `checksum.yml`))

      if (
        !checksums ||
        checksums[`package.json`] !== _get(data, [`package.json`, `sha1`])
      ) {
        await removeResolutions()
      }
    } catch (error) {
      logger.error(`error reading checksums`, error)
      await removeResolutions()
    }
  }
}

/**
 * Returns string value representing if filename contains `.development`, `.production`, or neither
 */
function getFileType(file: {name?: string}) {
  if (file.name?.includes(`production`)) return `production`
  if (file.name?.includes(`development`)) return `development`
  return `base`
}

export {data, get}
