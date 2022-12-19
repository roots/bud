import type {Context, File} from '@roots/bud-framework/options'
import {Filesystem, json, yml} from '@roots/bud-support/filesystem'
import {set} from '@roots/bud-support/lodash-es'

interface get {
  (props: {basedir: Context[`basedir`]; fs: Filesystem}): Promise<
    Record<string, File>
  >
}

let data: Record<string, File> = {}

const get: get = async ({basedir, fs}) => {
  let results: Array<string>

  try {
    results = await fs.list(basedir)
    if (!results) return data
  } catch (error) {
    throw error
  }

  try {
    await Promise.all(
      results?.map(async (name: string) => {
        const file = await fs.inspect(name, {
          checksum: `md5`,
          mode: true,
          absolutePath: true,
        })

        set(data, [`${name}`], {
          path: file.absolutePath,
          name: file.name,
          extension:
            file.type === `file` ? file.name.split(`.`).pop() : null,
          local: file.name.includes(`local`),
          dynamic:
            file.type === `file`
              ? isDynamicConfig(file.absolutePath)
              : null,
          bud: name.includes(`bud`) && file.type === `file`,
          type: name.includes(`production`)
            ? `production`
            : name.includes(`development`)
            ? `development`
            : `base`,
          size: file.size,
          md5: file.md5,
          mode: file.mode,
          file: file.type === `file`,
          dir: file.type === `dir`,
          symlink: file.type === `symlink`,
        })
      }),
    )
  } catch (error) {
    throw error
  }

  try {
    await Promise.all(
      Object.entries(data).map(
        async ([name, description]: [string, File]) => {
          try {
            if (description.dynamic) {
              try {
                const dynamicConfig = await import(description.path)

                set(
                  data,
                  [name, `module`],
                  dynamicConfig?.default ?? dynamicConfig,
                )
              } catch (error) {
                throw error
              }
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
            throw error
          }
        },
      ),
    )
  } catch (error) {
    throw error
  }

  return data
}

const isDynamicConfig = (path: string) =>
  [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].some((extension: string) =>
    path.endsWith(extension),
  )

export {data, get}
export type {File}
