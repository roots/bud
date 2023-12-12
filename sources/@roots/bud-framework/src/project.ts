import type {Bud} from '@roots/bud-framework'
import type {Stats} from '@roots/bud-framework/config'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import omit from '@roots/bud-support/omit'
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
    if (!bud.context.debug) {
      this.logger.log(`debug mode disabled. skipping write.`)
      return bud
    }

    await bud.fs
      .write(bud.path(`@storage`, bud.label, `debug`, `profile.yml`), {
        ...omit(bud.context, [`env`, `stdout`, `stderr`, `stdin`]),
        bootstrap: {
          args: args.raw,
          resolutions: bud.module.resolutions ?? {},
        },
        children: bud.children ? Object.keys(bud.children) : [],
        env: bud.env.getKeys(),
        loaded: Object.entries(bud.extensions?.repository).map(
          ([key, extension]) => ({
            key,
            ...(`label` in extension ? {label: extension.label} : {}),
            ...(`meta` in extension ? {meta: extension.meta} : {}),
            ...(`options` in extension
              ? {options: extension.options}
              : {}),
          }),
        ),
      })
      .catch(origin => {
        throw BudError.normalize(`Could not write profile.yml`, {
          details: `An error occurred while writing \`profile.yml\` to the filesystem.`,
          origin,
        })
      })
      .finally(() => {
        this.logger.log(`profile.yml written to disk`)
      })

    await bud.fs
      .write(
        bud.path(`@storage`, bud.label, `debug`, `build.config.yml`),
        bud.build.config,
      )
      .catch(origin => {
        throw BudError.normalize(`Could not write webpack.output.yml`, {
          details: `An error occurred while writing \`webpack.output.yml\` to the filesystem.`,
          origin,
        })
      })
      .finally(() => {
        this.logger.log(`webpack.output.yml written to disk`)
      })

    return bud
  }

  /**
   * {@link Service.compilerDone}
   */
  @bind
  public override async compilerDone(bud: Bud, stats: Stats) {
    return bud
  }
}
