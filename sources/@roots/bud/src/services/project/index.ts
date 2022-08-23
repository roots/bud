import * as Framework from '@roots/bud-framework'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {isString, omit} from 'lodash-es'
import {format} from 'pretty-format'

import type {repository} from './repository.js'

/**
 * Project service
 *
 * @public
 */
export default class Project
  extends Framework.ContainerService
  implements Framework.Project.Service
{
  /**
   * Service label
   *
   * @public
   */
  public static label = `project`

  /**
   * Service values repository
   *
   * @public
   */
  public repository: repository

  /**
   * Service bootstrap event
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async bootstrap() {
    this.setStore({
      context: omit(this.app.context, [
        `root`,
        `stdin`,
        `stderr`,
        `stdout`,
      ]),
      config: {
        development: {},
        production: {},
        base: {},
      },
      publicEnv: this.app.env.getPublicEnv(),
    })
  }

  /**
   * Service boot event
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    if (!this.app.isRoot) return

    await Promise.all(
      Object.entries(this.app.context.config).map(async ([name, path]) => {
        try {
          if (!name.includes(`bud`)) return

          const hasCondition = (condition: string) =>
            name.includes(condition)

          const hasExtension = (extension: string) =>
            path.endsWith(extension)

          const invalid =
            !path || !isString(path) || !name || !isString(name)

          if (invalid) {
            throw new Error(
              `File object with no path or name received from context.config by project.service`,
            )
          }

          const condition = hasCondition(`production`)
            ? `production`
            : hasCondition(`development`)
            ? `development`
            : `base`

          const isDynamicConfig = [
            `js`,
            `cjs`,
            `mjs`,
            `ts`,
            `cts`,
            `mts`,
          ].filter(hasExtension).length

          const importedConfig = isDynamicConfig
            ? await this.app.module.import(path)
            : hasExtension(`yml`)
            ? await this.app.yml.read(path)
            : hasExtension(`json`)
            ? await this.app.json.read(path)
            : {}

          this.set([`config`, condition, name], {
            name: name,
            path: path,
            module: importedConfig,
          })
        } catch (err) {
          this.app.warn(`error importing config`, name, `from`, path)
          this.app.warn(err)
        }
      }),
    )
  }

  @bind
  public async buildAfter() {
    if (!this.app.context.args.debug) {
      this.app.log(`debug set to false. skipping fs writes.`)
      return
    }

    try {
      const path = this.app.path(
        `@storage`,
        this.app.label,
        `profile.json`,
      )

      await fs.ensureFile(path)
      await fs.writeFile(
        path,
        this.app.json.stringify(
          omit(this.repository, [`context.env`]),
          null,
          2,
        ),
      )

      this.app.success(`profile written`)
    } catch (error) {
      this.app.error(`failed to write profile`)
    }

    try {
      const path = this.app.path(
        `@storage`,
        this.app.label,
        `webpack.config.snap`,
      )

      await fs.ensureFile(path)
      await fs.writeFile(path, format(this.app.build.config))

      this.app.success({
        message: `webpack.config.js written`,
        suffix: path,
      })
    } catch (error) {
      this.app.error(`failed to write webpack.config.json`)
    }
  }
}
