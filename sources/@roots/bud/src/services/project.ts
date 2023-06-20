import type {Bud} from '@roots/bud'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import omit from '@roots/bud-support/lodash/omit'
import * as args from '@roots/bud-support/utilities/args'

/**
 * Project service
 */
export default class Project extends Service {
  public promised: Array<Promise<any>> = []
  /**
   * {@link Service.buildAfter}
   */
  @bind
  public override async buildAfter(bud: Bud) {
    this.promised.push(
      /**
       * Module cache
       */
      bud.fs.write(bud.module.cacheLocation, {
        resolutions: bud.module.resolved,
        version: bud.context.bud.version,
      }),
    )

    if (bud.context.debug) {
      this.promised.push(
        bud.fs
          .write(bud.path(`@storage`, bud.label, `debug`, `profile.yml`), {
            ...omit(bud.context, [`env`]),
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
          .then(() => {
            this.logger.success(`profile.yml written to disk`)
          })
          .catch(error => {
            throw new BudError(`Could not write profile.yml`, {
              props: {
                details: `An error occurred while writing \`profile.yml\` to the filesystem.`,
                origin: BudError.normalize(error),
              },
            })
          }),
        bud.fs
          .write(
            bud.path(`@storage`, bud.label, `debug`, `build.config.yml`),
            bud.build.config,
          )
          .then(() => {
            this.logger.success(`webpack.output.yml written to disk`)
          })
          .catch(error => {
            throw new BudError(`Could not write webpack.output.yml`, {
              props: {
                details: `An error occurred while writing \`webpack.output.yml\` to the filesystem.`,
                origin: BudError.normalize(error),
              },
            })
          }),
      )
    }

    await Promise.all(this.promised)
  }

  /**
   * {@link Service.compilerDone}
   */
  @bind
  public override async compilerDone([bud, stats]) {
    this.logger.log(`compiler done`)

    if (!bud.context.debug) return
    if (!stats) return

    await bud.fs.write(
      bud.path(`@storage`, bud.label, `debug`, `stats.yml`),
      {
        compilation: bud.compiler.stats.toJson({all: true}),
        message: stats.toString(),
      },
    )
  }
}
