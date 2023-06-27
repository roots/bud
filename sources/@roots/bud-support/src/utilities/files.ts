import type * as esbuild from '@roots/bud-support/esbuild'
import type {Filesystem} from '@roots/bud-support/filesystem'
import type {InspectResult} from '@roots/filesystem/filesystem'

import * as filesystem from '@roots/bud-support/filesystem'
import _get from '@roots/bud-support/lodash/get'
import omit from '@roots/bud-support/lodash/omit'
import _set from '@roots/bud-support/lodash/set'
import logger from '@roots/bud-support/logger'
import {get as getPaths} from '@roots/bud-support/utilities/paths'
import {join, parse} from 'node:path'

const moduleExtensions = [`.js`, `.cjs`, `.mjs`, `.ts`, `.cts`, `.mts`]
const jsonExtensions = [`.json`, `.json5`, `.yml`, `.yaml`]
const allCompatibleExtensions = [...moduleExtensions, ...jsonExtensions]

let files: Array<string>
let fs: Filesystem
let data: Record<string, any>
let paths: ReturnType<typeof getPaths>
let transformer: esbuild.transformer

interface File {
  bud: boolean
  local: boolean
  module?: () => Promise<any>
  name: string
  parsed: ReturnType<typeof parse>
  path: string
  sha1: string
  target: `base` | `development` | `production`
  type: `file` | `json` | `module` | `symlink`
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
  }

  logger.scope(`fs`).time(`Initializing filesystem`)

  files = []
  data = {}

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

  if (!parsed.ext || !allCompatibleExtensions.includes(parsed.ext)) {
    logger.info(`Skipping`, filename, `(unknown extension)`)
    return
  }

  const inspect = await fs.inspect(filename, {
    absolutePath: true,
    checksum: `sha1`,
    symlinks: `follow`,
  })

  if (!isNormalInspectResult(inspect)) return

  const target = getFileTarget(inspect)
  const type = getFileType(inspect, parsed)

  if (!type) {
    logger.info(`Skipping`, inspect?.name, type, inspect?.absolutePath)
    return
  }

  const file: File = {
    ...omit(inspect, `absolutePath`, `type`),
    bud: inspect.name.includes(`bud`),
    local: inspect.name.includes(`local`),
    parsed,
    path: inspect.absolutePath,
    target,
    type,
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
      logger.scope(`fs`).time(`loading ${file.name}`)

      const current = await fs
        .inspect(file.path, {
          absolutePath: true,
          checksum: `sha1`,
          symlinks: `follow`,
        })
        .catch(error => {
          throw error
        })

      if (!isNormalInspectResult(current)) {
        logger.error(file)
        throw new Error(`Problem inspecting ${file.name} (${file.path})`)
      }

      /**
       * Handle non-typescript files using native esm loader
       */
      if (!file.parsed.ext.startsWith(`.t`)) {
        /**
         * bust the cache with the {@link current} sha1
         */
        const value = await import(file.path.concat(`?v=${current.sha1}`))

        logger
          .scope(`fs`)
          .info(`loading ${file.name}`, value)
          .timeEnd(`loading ${file.name}`)

        return value?.default ?? value
      }

      const extension = [`.cjs`, `.cts`].includes(file.parsed.ext)
        ? `.cjs`
        : `.mjs`

      const outfile = join(
        paths.storage,
        `configs`,
        `${current.sha1}${extension}`,
      )

      const modified = current.sha1 !== file.sha1
      const uncompiled = !(await fs.exists(outfile))

      if (modified || uncompiled) {
        if (uncompiled)
          logger.log(`${file.name} has not been compiled yet`)
        else if (modified)
          logger.log(`${file.name} has been modified since last compiled`)

        // Update the hash to the current state
        file.sha1 = current.sha1

        await esTransform({file, outfile}).catch(error => {
          throw error
        })
      }

      const value = await import(outfile).catch(error => {
        throw error
      })

      logger.scope(`fs`).timeEnd(`loading ${file.name}`)

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
  logger.time(`compiling ${file.name}`)

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
    allowOverwrite: true,
    entryPoints: [file.path],
    nodePaths: [paths.basedir, join(paths.basedir, `node_modules`)],
    outfile,
    platform: `node`,
  })

  logger.timeEnd(`compiling ${file.name}`)
}

async function verifyResolutionCache() {
  if (await fs.exists(join(paths.storage, `checksum.yml`))) {
    const hashes = await fs.read(join(paths.storage, `checksum.yml`))
    if (
      !hashes ||
      !hashes[`package.json`] ||
      !hashes[`package.json`] !== _get(data, [`package.json`, `sha1`])
    ) {
      logger.await(`removing old module resolutions`)
      await fs
        .remove(join(paths.storage, `resolutions.yml`))
        .catch(error => logger.error(`error removing resolutions`, error))
        .finally(() => logger.success(`removed old module resolutions`))
    }
  }

  await fs.write(
    join(paths.storage, `checksum.yml`),
    Object.entries(data).reduce(
      (acc: Record<string, string>, [key, value]) => {
        acc[key] = value.sha1
        return acc
      },
      {},
    ),
  )
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
  if (file.name?.includes(`production`)) return `production`
  if (file.name?.includes(`development`)) return `development`
  return `base`
}

function isNormalInspectResult(
  file?: InspectResult,
): file is InspectResult & {
  absolutePath: string
  name: string
  sha1: string
  type: `file` | `symlink`
} {
  if (file === undefined) return false
  if (file.sha1 === undefined) return false
  if (file.name === undefined) return false
  if (file.absolutePath === undefined) return false
  if ([`dir`, false, undefined].includes(file.type)) return false

  return true
}

export {data, get}
