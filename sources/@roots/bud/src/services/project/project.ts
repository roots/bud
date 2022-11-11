import type {Bud} from '@roots/bud-framework'
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
  public static override label = `project`

  /**
   * `build.after` hook callback
   *
   * @public
   */
  @bind
  public override async buildAfter(bud: Bud) {
    if (!bud.context.args.debug) {
      return bud.info(`--debug not \`true\`. skipping fs write.`)
    }

    try {
      const path = bud.path(`@storage`, bud.label, `profile.json`)

      await bud.fs.write(
        path,
        bud.fs.json.stringify(
          {
            basedir: bud.context.basedir,
            children: bud.children ? Object.keys(bud.children) : [],
            context: {
              args: bud.context?.args,
              extensions: bud.context?.extensions,
              services: bud.context?.services,
            },
            extensions: bud.extensions.repository,
            hooks: {
              sync: bud.hooks.syncStore.store,
              async: bud.hooks.asyncStore.store,
              actions: bud.hooks.events.store,
            },
          },
          null,
          2,
        ),
      )

      bud.success(`profile written to `, path)
    } catch (error) {
      bud.error(`failed to write profile`, error)
    }

    try {
      const path = bud.path(`@storage`, bud.label, `webpack.config.dump`)
      await bud.fs.write(path, format(bud.build.config))

      bud.success(`webpack.config.dump written to`, path)
    } catch (error) {
      bud.error(`failed to write webpack.config.dump`, error)
    }
  }
}
