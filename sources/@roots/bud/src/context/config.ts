import type {Context, File} from '@roots/bud-framework/options'
import {Filesystem, json, yml} from '@roots/bud-support/filesystem'
import {set} from '@roots/bud-support/lodash-es'

interface get {
  (props: {basedir: Context[`basedir`]; fs: Filesystem}): Promise<
    Context[`config`]
  >
}

let files: Array<string> = []
let data: Context[`config`] = {}

const get: get = async ({basedir, fs}) => {
  files = await fs.list(basedir)
  if (!files) return data

  try {
    await Promise.all(
      files.map(async (name: string) => {
        const file = await fs.inspect(name, {
          checksum: `md5`,
          mode: true,
          absolutePath: true,
        })

        set(data, [`${name}`], {
          path: file.absolutePath,
          name: file.name,
          size: file.size,
          md5: file.md5,
          mode: file.mode,
          file: file.type === `file`,
          dir: file.type === `dir`,
          symlink: file.type === `symlink`,

          local: file.name.includes(`local`),
          bud: name.includes(`bud`) && file.type === `file`,

          dynamic:
            file.type === `file`
              ? isDynamicConfig(file.absolutePath)
              : null,

          type: name.includes(`production`)
            ? `production`
            : name.includes(`development`)
            ? `development`
            : `base`,

          extension:
            file.type === `file` ? file.name.split(`.`).pop() : null,
        })
      }),
    )
  } catch (error) {}

  try {
    await Promise.all(
      Object.entries(data).map(
        async ([name, description]: [string, File]) => {
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
          } catch (error) {}
        },
      ),
    )
  } catch (error) {}

  return data
}

const isDynamicConfig = (path: string) =>
  [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].some(ext => path.endsWith(ext))

export {data, files, get}
export type {File}
