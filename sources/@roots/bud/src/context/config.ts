import {join} from 'node:path'

import type {Context, File} from '@roots/bud-framework/options'
import {Filesystem, json, yml} from '@roots/bud-support/filesystem'
import isEqual from '@roots/bud-support/lodash/isEqual'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import set from '@roots/bud-support/lodash/set'

interface get {
  (props: {basedir: Context[`basedir`]; fs: Filesystem}): Promise<
    Context[`config`]
  >
}

let files: Array<string> = []
let configs: Context[`config`] = {}
let fs: Filesystem

const get: get = async ({basedir, fs: fsService}) => {
  fs = fsService

  const baseConfig = await fs.list(basedir)
  if (baseConfig) {
    files.push(...baseConfig)
  }
  const configDir = await fs.list(join(basedir, `config`))
  if (configDir) {
    files.push(...configDir)
  }

  if (!files) return configs

  await Promise.all(files?.map(sourceConfigFile))
  await Promise.all(Object.entries(configs).map(makeConfigObject))

  return configs
}

export const sourceConfigFile = async (name: string) => {
  try {
    const file = await fs.inspect(name, {
      mode: true,
      absolutePath: true,
    })

    set(configs, [`${name}`], {
      ...file,
      path: file.absolutePath,
      file: isEqual(file.type, `file`),
      dir: isEqual(file.type, `dir`),
      symlink: isEqual(file.type, `symlink`),
      local: file.name.includes(`local`),
      bud: name.includes(`bud`) && isEqual(file.type, `file`),
      dynamic: isEqual(file.type, `file`)
        ? isDynamicConfig(file.absolutePath)
        : null,
      type: name.includes(`production`)
        ? `production`
        : name.includes(`development`)
        ? `development`
        : `base`,

      extension: isEqual(file.type, `file`)
        ? file.name.split(`.`).pop()
        : null,
    })
  } catch (e) {}
}

export const makeConfigObject = async ([
  name,
  {bud, dynamic, extension, path},
]) => {
  try {
    let config =
      extension === `json`
        ? await json.read(path)
        : extension === `yml`
        ? await yml.read(path)
        : dynamic && bud
        ? await import(path).then(mod => mod?.default ?? mod)
        : undefined

    !isUndefined(config) && set(configs, [name, `module`], config)
  } catch (e) {
    if (bud) {
      const error = new Error(e)
      error.name = `Error reading config file`
      error.message = [
        `\n${name} appears to be a bud config file, but it could not be imported.`,
        `Original error follows:\n${error.message}`,
      ].join(`\n\n`)

      throw error
    }
  }
}

const isDynamicConfig = (path: string) =>
  [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].some(ext => path.endsWith(ext))

export {configs, files, get}
export type {File}
