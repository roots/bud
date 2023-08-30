import type {Bud} from '@roots/bud-framework'
import type {Stats} from '@roots/bud-framework/config'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import omit from '@roots/bud-support/lodash/omit'
import * as args from '@roots/bud-support/utilities/args'

/**
 * Project service
 */
export default class Project extends Service {
  /**
   * {@link Service.buildAfter}
   */
  @bind
  public override async buildAfter(bud: Bud) {
    if (!bud.context.debug) return

    await bud.promise(async bud => {
      await bud.fs
        .write(bud.path(`@storage`, bud.label, `debug`, `profile.yml`), {
          ...omit(bud.context, [`env`, `stdout`, `stderr`, `stdin`]),
          bootstrap: {
            args: args.raw,
            resolutions: bud.module.resolved,
          },
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
        })
        .catch(error => {
          throw new BudError(`Could not write profile.yml`, {
            details: `An error occurred while writing \`profile.yml\` to the filesystem.`,
            origin: BudError.normalize(error),
          })
        })
        .finally(() => {
          this.logger.success(`profile.yml written to disk`)
        })

      await bud.fs
        .write(
          bud.path(`@storage`, bud.label, `debug`, `build.config.yml`),
          bud.build.config,
        )
        .catch(error => {
          throw new BudError(`Could not write webpack.output.yml`, {
            details: `An error occurred while writing \`webpack.output.yml\` to the filesystem.`,
            origin: BudError.normalize(error),
          })
        })
        .finally(() => {
          this.logger.success(`webpack.output.yml written to disk`)
        })
    })
  }

  /**
   * {@link Service.compilerDone}
   */
  @bind
  public override async compilerDone(bud: Bud, stats: Stats) {
    this.logger.log(`compiler done`)

    if (!bud.context.debug) return
    if (!stats) return

    await bud.fs.write(
      bud.path(`@storage`, bud.label, `debug`, `stats.yml`),
      {
        compilation: bud.compiler?.stats.toJson(`verbose`),
        message: stats.toString(),
      },
    )
  }
}
