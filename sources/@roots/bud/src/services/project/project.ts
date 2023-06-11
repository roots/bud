import type {Bud} from '@roots/bud-framework'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, FileWriteError} from '@roots/bud-support/errors'
import omit from '@roots/bud-support/lodash/omit'
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
    if (!bud.context.debug)
      return bud.info(`--debug not \`true\`. skipping fs write.`)

    try {
      const path = bud.path(`@storage`, bud.label, `debug`, `profile.yml`)

      await bud.fs.write(path, {
        ...omit(bud.context, [`env`, `logger`, `stdout`, `stderr`]),
        args: args.raw,
        children: bud.children ? Object.keys(bud.children) : [],
        env: bud.env.getKeys(),
        loaded: Object.entries(bud.extensions?.repository).map(
          ([key, extension]) => ({
            key,
            label: extension.label,
            meta: extension.meta,
            options: extension.options,
          }),
        ),
        resolutions: bud.module.resolved,
        services: bud.context?.services,
      })

      bud.success(`profile written to `, path)
    } catch (error) {
      throw new FileWriteError(`profile.yml`, {
        props: {
          details: `An error occurred while writing \`profile.yml\` to the filesystem.`,
          origin: BudError.normalize(error),
        },
      })
    }

    try {
      const path = bud.path(
        `@storage`,
        bud.label,
        `debug`,
        `build.config.yml`,
      )
      await bud.fs.write(path, bud.build.config)

      bud.success(`webpack.output.yml written to`, path)
    } catch (error) {
      throw new FileWriteError(`webpack.output.yml`, {
        props: {
          details: `An error occurred while writing \`webpack.output.yml\` to the filesystem.`,
          origin: BudError.normalize(error),
        },
      })
    }
  }
}

export {Project}
