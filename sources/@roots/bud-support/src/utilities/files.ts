import {join} from 'node:path'

import omit from '@roots/bud-support/lodash/omit'
import type {InspectResult} from 'fs-jetpack/types.js'

import {FileReadError, ImportError} from '../errors/index.js'
import type {Filesystem} from '../filesystem/index.js'
import isEqual from '../lodash/isEqual/index.js'
import set from '../lodash/set/index.js'
import * as filesystem from './filesystem.js'
import logger from './logger.js'
import {get as getPaths} from './paths.js'

let fs: Filesystem
let data: {[key: string]: any} = {}
let paths: ReturnType<typeof getPaths>

const get = async (basedir: string) => {
  if (data && Object.entries(data).length) return data

  let files: Array<string> = []

  fs = filesystem.get(basedir)
  paths = getPaths(basedir)

  logger.log(paths)

  logger.scope(`fs`).time(`Initializing filesystem`)

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

async function fetchFileInfo(name: string) {
  let file: InspectResult | undefined
  if (name.endsWith(`.lock`)) return

  try {
    file = await fs.inspect(name, {
      mode: true,
      absolutePath: true,
      symlinks: `follow`,
      checksum: `sha1`,
    })
  } catch (cause) {}

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
    file.name.includes(`bud`) && isEqual(file.type, `file`),
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

  try {
    if (getValue(file.name, `static`)) {
      set(
        data,
        [file.name, `module`],
        await fs.read(getValue(file.name, `path`)),
      )
    }
  } catch (cause) {
    const error = new FileReadError(file.name)
    if (getValue(file.name, `bud`)) throw error
    logger.scope(`fs`, name).warn(error)
  }

  try {
    if (getValue(file.name, `dynamic`)) {
      set(
        data,
        [file.name, `module`],
        await import(getValue(file.name, `path`)).then(
          mod => mod?.default ?? mod,
        ),
      )
    }
  } catch (cause) {
    const error = new ImportError(`${file.name} could not be imported`)
    if (getValue(file.name, `bud`)) throw error
    logger.scope(`fs`, name).info(error)
  }
}

function isStaticConfig(extension?: string | null) {
  if (!extension) return
  return [`json`, `yml`, `yaml`].includes(extension)
}

function isDynamicConfig(extension?: string | null) {
  if (!extension) return
  return [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].includes(extension)
}

function getValue(name: string, prop?: string) {
  if (!prop) return data[name]
  return data[name]?.[prop]
}

export {get, data}
