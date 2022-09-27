import {Service as BaseService} from '@roots/bud-framework/service'
import type {Service} from '@roots/bud-framework/services/project'
import {bind} from '@roots/bud-support/decorators'
import * as fs from '@roots/bud-support/filesystem'
import {omit} from '@roots/bud-support/lodash-es'
import format from '@roots/bud-support/pretty-format'

/**
 * Project service
 *
 * @public
 */
export default class Project extends BaseService implements Service {
  /**
   * Service label
   *
   * @public
   */
  public static label = `project`

  /**
   * `build.after` hook callback
   *
   * @public
   */
  @bind
  public async buildAfter() {
    if (!this.app.context.args.debug) {
      this.app.info(`--debug not \`true\`. skipping fs write`)
      return
    }

    try {
      const path = this.app.path(
        `@storage`,
        this.app.label,
        `profile.json`,
      )

      await fs.write(
        path,
        fs.json.stringify(
          {
            ...omit(
              this.app.context,
              `env`,
              `stdout`,
              `stderr`,
              `stdin`,
              `stdio`,
            ),
            extensions: this.app.extensions.repository,
          },
          null,
          2,
        ),
      )

      this.app.success(`profile written to `, path)
    } catch (error) {
      this.app.error(`failed to write profile`, error)
    }

    try {
      const path = this.app.path(
        `@storage`,
        this.app.label,
        `webpack.config.dump`,
      )

      await fs.write(path, format(this.app.build.config))

      this.app.success(`webpack.config.dump written to`, path)
    } catch (error) {
      this.app.error(`failed to write webpack.config.dump`, error)
    }
  }
}
