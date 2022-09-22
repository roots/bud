import * as json from '@roots/bud-framework/parsers/json5'
import * as yml from '@roots/bud-framework/parsers/yml'
import {bind} from '@roots/bud-support/decorators'
import globby from '@roots/bud-support/globby'
import {set} from '@roots/bud-support/lodash-es'
import {basename, join, normalize} from 'node:path'

interface ConfigFileDescription {
  name: string
  path: string
  bud: boolean
  local: boolean
  dynamic: boolean
  extension: string | null
  type: `production` | `development` | `base`
  module: any
}

/**
 * Context: disk
 *
 * @public
 */
export default class Config {
  /**
   * Config data
   *
   * @public
   */
  public data: Record<string, ConfigFileDescription> = {}

  public static hasExtension(path: string, extension: string) {
    return path.endsWith(extension)
  }

  public static isDynamicConfig(path: string) {
    return [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].some(
      (extension: string) => path.endsWith(extension),
    )
  }

  /**
   * Find configs
   *
   * @public
   */
  @bind
  public async find(basedir: string): Promise<Config> {
    const results = await globby(
      [
        `*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}`,
        `*rc`,
        join(`config`, `*.{cts,mts,ts,cjs,mjs,js,json,toml,yml}`),
        join(`config`, `*rc`),
      ],
      {
        absolute: true,
        cwd: basedir,
        dot: true,
        gitignore: true,
        onlyFiles: true,
      },
    )

    results?.map((filePath: string) => {
      const name = basename(normalize(filePath))
      const extension = name.split(`.`).pop()
      const path = normalize(filePath)

      set(this.data, [`${name}`], {
        name,
        path,
        extension,
        local: name.includes(`local`),
        dynamic: Config.isDynamicConfig(path),
        bud: name.includes(`bud`),
        type: name.includes(`production`)
          ? `production`
          : name.includes(`development`)
          ? `development`
          : `base`,
      })
    })

    await Promise.all(
      Object.entries(this.data).map(
        async ([name, description]: [string, ConfigFileDescription]) => {
          try {
            if (description.dynamic) {
              const dynamicConfig = await import(description.path)
              set(
                this.data,
                [name, `module`],
                dynamicConfig?.default ?? dynamicConfig,
              )
            }

            if (description.extension === `json`) {
              const jsonConfig = await json.read(description.path)
              set(this.data, [name, `module`], jsonConfig)
            }

            if (description.extension === `yml`) {
              const ymlConfig = await yml.read(description.path)
              set(this.data, [name, `module`], ymlConfig)
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error.message)
          }
        },
      ),
    )

    return this
  }
}
