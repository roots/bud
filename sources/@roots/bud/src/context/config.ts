import {basename, join, normalize} from 'node:path'

import {json, yml} from '@roots/bud-support/filesystem'
import FS from '@roots/bud-support/fs-jetpack'
import {set} from '@roots/bud-support/lodash-es'

export interface ConfigFileDescription {
  name: string
  path: string
  bud: boolean
  local: boolean
  dynamic: boolean
  extension: string | null
  type: `production` | `development` | `base`
  module: any
}

let data: Record<string, ConfigFileDescription> = {}

export interface get {
  (basedir: string): Promise<Record<string, ConfigFileDescription>>
}

export const get: get = async basedir => {
  const fs = FS.cwd(basedir)
  const results: Array<string> = []

  try {
    results.push(
      ...(await fs.find({
        recursive: false,
        directories: false,
        matching: [
          `*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}`,
          `*rc`,
          join(`config`, `*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}`),
          join(`config`, `*rc`),
          `yarn.lock`,
          `package-lock.json`,
        ],
      })),
    )
  } catch (error) {
    throw error
  }

  await Promise.all(
    results?.map(async (name: string) => {
      set(data, [`${name}`], {
        path: fs.path(name),
        name: basename(normalize(name)),
        extension: name.split(`.`).pop(),
        local: name.includes(`local`),
        dynamic: isDynamicConfig(fs.path(name)),
        bud: name.includes(`bud`),
        type: name.includes(`production`)
          ? `production`
          : name.includes(`development`)
          ? `development`
          : `base`,
      })
    }),
  )

  await Promise.all(
    Object.entries(data).map(
      async ([name, description]: [string, ConfigFileDescription]) => {
        try {
          if (description.dynamic) {
            const dynamicConfig = await import(description.path)

            set(
              data,
              [name, `module`],
              dynamicConfig?.default ?? dynamicConfig,
            )
          }

          if (description.extension === `json`) {
            const jsonConfig = await json.read(description.path)
            set(data, [name, `module`], jsonConfig)
          }

          if (description.extension === `yml`) {
            const ymlConfig = await yml.read(description.path)
            set(data, [name, `module`], ymlConfig)
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.message)
        }
      },
    ),
  )

  return data
}

const isDynamicConfig = (path: string) =>
  [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].some((extension: string) =>
    path.endsWith(extension),
  )

export default get
