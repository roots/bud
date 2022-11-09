import {Service as BaseService} from '@roots/bud-framework/service'
import type {Service} from '@roots/bud-framework/services/project'
import {bind} from '@roots/bud-support/decorators'
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
      this.app.info(`--debug not \`true\`. skipping fs write.`)
      return
    }

    try {
      const path = this.app.path(
        `@storage`,
        this.app.label,
        `profile.json`,
      )

      await this.app.fs.write(
        path,
        this.app.fs.json.stringify(
          {
            basedir: this.app.context.basedir,
            children: this.app.children
              ? Object.keys(this.app.children)
              : [],
            context: {
              args: this.app.context?.args,
              extensions: this.app.context?.extensions,
              services: this.app.context?.services,
            },
            extensions: this.app.extensions.repository,
            hooks: {
              sync: this.app.hooks.syncStore.store,
              async: this.app.hooks.asyncStore.store,
              actions: this.app.hooks.events.store,
            },
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

      await this.app.fs.write(path, format(this.app.build.config))

      this.app.success(`webpack.config.dump written to`, path)
    } catch (error) {
      this.app.error(`failed to write webpack.config.dump`, error)
    }
  }
}
