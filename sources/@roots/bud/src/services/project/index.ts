import * as Framework from '@roots/bud-framework'
import fs from 'fs-extra'
import {bind, once} from 'helpful-decorators'
import {isString, omit} from 'lodash-es'

import type {repository} from './repository.js'

/**
 * Project service
 *
 * @public
 */
export class Project
  extends Framework.ContainerService
  implements Framework.Project.Service
{
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
  public async bootstrap() {
    this.setStore({
      context: omit(this.app.context, [`stdin`, `stderr`, `stdout`]),
      version: null,
      config: {
        development: {},
        production: {},
        base: {},
      },
      manifest: {},
      publicEnv: this.app.env.getPublicEnv(),
    })

    await this.loadManifest()
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

    await this.searchConfigs()

    this.app.hooks.action(`build.after`, async (app: Framework.Bud) => {
      await app.hooks.fire(`project.write`)
      await this.writeProfile()
    })
  }

  /**
   * Read manifest from disk
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async loadManifest(): Promise<void> {
    this.set(`manifest`, this.app.context.manifest)
  }

  /**
   * Write profile
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async writeProfile() {
    try {
      const path = this.app.path(`@storage`, this.app.name, `profile.json`)

      await fs.ensureFile(path)
      await fs.writeFile(
        path,
        this.app.json.stringify(
          omit(this.repository, [`context.env`]),
          null,
          2,
        ),
      )

      this.app.success({
        message: `profile written`,
        suffix: path,
      })
    } catch (error) {
      this.app.error(`failed to write profile`)
    }

    try {
      const path = this.app.path(
        `@storage`,
        this.app.name,
        `webpack.config.js`,
      )

      await fs.ensureFile(path)
      await fs.writeFile(
        path,
        `module.exports = ${this.app.json.stringify(
          this.app.build.config,
          null,
          2,
        )}`,
      )

      this.app.success({
        message: `webpack.config.js written`,
        suffix: path,
      })
    } catch (error) {
      this.app.error(`failed to write webpack.config.json`)
    }
  }

  /**
   * Search configs
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async searchConfigs() {
    await Promise.all(
      Object.entries(this.app.context.disk.config).map(
        async ([name, path]) => {
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
                `File object with no path or name received from context.disk.config by project.service`,
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
        },
      ),
    )
  }
}
