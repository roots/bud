import {join} from 'node:path'

import type {Filesystem} from '../filesystem/index.js'
import isEqual from '../lodash/isEqual/index.js'
import set from '../lodash/set/index.js'
import * as filesystem from './filesystem.js'
import logger from './logger.js'

let fs: Filesystem
let files: Array<string> = []
let data: {[key: string]: any} = {}

const get = async (basedir: string) => {
  fs = filesystem.get(basedir)

  if (data && Object.entries(data).length) return data

  logger.scope(`fs`).log(`Initializing fs`)
  logger.time(`listing files`)

  await fs
    .list(basedir)
    .then(res => files.push(...(res?.filter(Boolean) ?? [])))

  await fs
    .list(join(basedir, `config`))
    .then(res => files.push(...(res?.filter(Boolean) ?? [])))

  await Promise.all(files?.map(fetchFileInfo))
  logger.timeEnd(`listing files`).unscope()

  logger.scope(`fs`).time(`importing project files`)
  await Promise.all(files?.map(importFiles))
  logger.timeEnd(`importing project files`).unscope()

  return data
}

async function fetchFileInfo(name: string) {
  try {
    if (name.endsWith(`.lock`)) return

    const file = await fs.inspect(name, {
      mode: true,
      absolutePath: true,
      symlinks: `follow`,
      checksum: `sha1`,
    })

    if (!file) return

    logger.scope(`fs`).info(`Reading project file: ${name}`)
    logger.unscope()

    set(data, [name], file)
    set(data, [name, `path`], file.absolutePath)
    set(data, [name, `absolutePath`], file.absolutePath)
    set(data, [name, `file`], isEqual(file.type, `file`))
    set(data, [name, `dir`], isEqual(file.type, `dir`))
    set(data, [name, `symlink`], isEqual(file.type, `symlink`))
    set(data, [name, `local`], file.name.includes(`local`))
    set(
      data,
      [name, `bud`],
      name.includes(`bud`) && isEqual(file.type, `file`),
    )
    set(
      data,
      [name, `type`],
      name.includes(`production`)
        ? `production`
        : name.includes(`development`)
        ? `development`
        : `base`,
    )
    set(
      data,
      [name, `extension`],
      getValue(name, `file`) ? file.name.split(`.`).pop() : null,
    )
    set(
      data,
      [name, `dynamic`],
      isDynamicConfig(getValue(name, `extension`)),
    )
    set(
      data,
      [name, `static`],
      isStaticConfig(getValue(name, `extension`)),
    )

    if (getValue(name, `static`)) {
      set(data, [name, `module`], await fs.read(getValue(name, `path`)))
    }
  } catch (e) {
    logger.error(`Error reading project file ${name}:\n\n${e}`)
    if (getValue(name, `bud`)) {
      logger.error(
        `${name} seems to be a bud configuration file. Exiting.`,
      )
      throw new Error()
    }
  }
}

async function importFiles(name: string) {
  try {
    if (!getValue(name)) return

    if (getValue(name, `static`)) {
      set(data, [name, `module`], await fs.read(getValue(name, `path`)))
    }

    if (getValue(name, `dynamic`) && getValue(name, `bud`))
      set(
        data,
        [name, `module`],
        await import(getValue(name, `path`)).then(
          mod => mod?.default ?? mod,
        ),
      )
  } catch (e) {
    logger.error(`Error importing project file ${name}:\n\n${e}`)
    if (getValue(name, `bud`)) {
      logger.error(
        `${name} seems to be a bud configuration file. Exiting.`,
      )
      throw new Error()
    }
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

export {files, get, data}
