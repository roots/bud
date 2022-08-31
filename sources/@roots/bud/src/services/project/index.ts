import {ContainerService} from '@roots/bud-framework'
import type {Service} from '@roots/bud-framework/services/project'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {omit} from 'lodash-es'
import {format} from 'pretty-format'

import type {repository} from './repository.js'

/**
 * Project service
 *
 * @public
 */
export default class Project extends ContainerService implements Service {
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
      publicEnv: this.app.env.getPublicEnv(),
    })
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
        `webpack.config.dump`,
      )

      await fs.ensureFile(path)
      await fs.writeFile(path, format(this.app.build.config))

      this.app.success({
        message: `webpack.config.js written`,
        suffix: path,
      })
    } catch (error) {
      this.app.error(`failed to write webpack.config.dump`)
    }
  }
}
