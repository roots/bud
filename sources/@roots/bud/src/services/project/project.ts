import type {Bud} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators'
import format from '@roots/bud-support/pretty-format'

/**
 * Project service
 */
class Project extends Service {
  /**
   * `build.after` hook callback
   */
  @bind
  public override async buildAfter?(bud: Bud) {
    if (!bud.isCLI()) {
      bud.info(`not a CLI build. skipping project profile.`)
      return
    }
    if (!bud.context.args?.debug) {
      bud.info(`--debug not \`true\`. skipping fs write.`)
      return
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
            trace: bud.api.trace,
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

export {Project}
