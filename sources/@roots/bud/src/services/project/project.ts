import type {Bud} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators'
import * as args from '@roots/bud-support/utilities/args'

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
      const path = bud.path(`@storage`, `debug`, bud.label, `profile.yml`)

      await bud.fs.write(path, {
        basedir: bud.context.basedir,
        mode: bud.mode,
        isCLI: bud.isCLI(),
        bud: bud.context.bud.version,
        minimize: bud.hooks.filter(
          `build.optimization.minimize`,
          undefined,
        ),
        env: bud.env.getKeys(),
        children: bud.children ? Object.keys(bud.children) : [],
        args: bud.context?.args,
        args_raw: args.raw,
        services: bud.context?.services,
        extensions: {
          context: bud.context?.extensions,
          loaded: bud.extensions?.repository,
        },
        resolutions: bud.module.resolved,
      })

      bud.success(`profile written to `, path)
    } catch (error) {
      bud.error(`failed to write profile`, error)
    }

    try {
      const path = bud.path(
        `@storage`,
        `debug`,
        bud.label,
        `build.config.yml`,
      )
      await bud.fs.write(path, bud.build.config)

      bud.success(`webpack.output.yml written to`, path)
    } catch (error) {
      bud.error(`failed to write webpack.output.yml`, error)
    }
  }
}

export {Project}
