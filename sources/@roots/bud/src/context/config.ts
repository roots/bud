import * as json from '@roots/bud-framework/parsers/json5'
import * as yml from '@roots/bud-framework/parsers/yml'
import {globby} from 'globby'
import {bind} from 'helpful-decorators'
import {set} from 'lodash-es'
import {basename, join, normalize} from 'node:path/posix'

interface ConfigFileDescription {
  name: string
  path: string
  condition: `production` | `development` | `base`
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
      const path = normalize(filePath)

      set(this.data, [`${name}`], {
        name,
        path,
        condition: name.includes(`production`)
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
            if (!name.includes(`bud`) && name !== `package.json`) return

            const hasExtension = (extension: string) =>
              description.path.endsWith(extension)

            const isDynamicConfig = [
              `js`,
              `cjs`,
              `mjs`,
              `ts`,
              `cts`,
              `mts`,
            ].filter(hasExtension).length

            if (isDynamicConfig) {
              const dynamicConfig = await import(description.path)
              set(
                this.data,
                [name, `module`],
                dynamicConfig.default ?? dynamicConfig,
              )
            }

            if (hasExtension(`json`)) {
              const jsonConfig = await json.read(description.path)
              set(this.data, [name, `module`], jsonConfig)
            }

            if (hasExtension(`yml`)) {
              const ymlConfig = await yml.read(description.path)
              set(this.data, [name, `module`], ymlConfig)
            }
          } catch (err) {
            process.stderr.write(err?.message ?? err)
          }
        },
      ),
    )

    return this
  }
}
