import {basename, join, normalize} from 'node:path'

import {bind} from '@roots/bud-support/decorators'
import {json, yml} from '@roots/bud-support/filesystem'
import fs from '@roots/bud-support/fs-jetpack'
import {set} from '@roots/bud-support/lodash-es'

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

  /**
   * Has extension
   *
   * @param path - Path to file
   * @param extension - File extension
   * @returns boolean
   *
   * @public
   */
  public static hasExtension(path: string, extension: string) {
    return path.endsWith(extension)
  }

  /**
   * Return true if extension is an executable script
   *
   * @param path - Path to file
   * @returns boolean
   *
   * @public
   */
  public static isDynamicConfig(path: string) {
    return [`js`, `cjs`, `mjs`, `ts`, `cts`, `mts`].some(
      (extension: string) => path.endsWith(extension),
    )
  }

  /**
   * Class constructor
   *
   * @param basedir - Project root
   *
   * @public
   */
  public constructor(public basedir: string) {}

  /**
   * Find configs
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async find(): Promise<Config> {
    const results = await fs.cwd(this.basedir).find({
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
    })

    results?.map((name: string) => {
      const path = fs.cwd(this.basedir).path(name)

      set(this.data, [`${name}`], {
        path,
        name: basename(normalize(name)),
        extension: name.split(`.`).pop(),
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
