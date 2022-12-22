import type {Context, File} from '@roots/bud-framework/options'
import {Filesystem, json, yml} from '@roots/bud-support/filesystem'
import {isEqual, set} from '@roots/bud-support/lodash-es'

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
          checksum: `sha1` as `sha1`,
          mode: true,
          absolutePath: true,
        })

        set(data, [`${name}`], {
          path: file.absolutePath,
          ...file,
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
      }),
    )
  } catch (error) {}

  try {
    await Promise.all(
      Object.entries(data).map(
        async ([name, {bud, dynamic, extension, path}]) => {
          let config: unknown

          try {
            if (extension === `json`) config = await json.read(path)
            else if (extension === `yml`) config = await yml.read(path)
            else if (dynamic && bud)
              config = await import(path).then(mod => mod?.default ?? mod)

            set(data, [name, `module`], config)
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
