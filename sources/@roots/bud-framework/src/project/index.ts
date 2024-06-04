import type {Bud} from '@roots/bud-framework'

import * as args from '@roots/bud-framework/bootstrap/args'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import omit from '@roots/bud-support/omit'

/**
 * Project service
 */
export default class Project extends Service {
  /**
   * [@link Service.compilerBefore}
   */
  @bind
  public override async compilerBefore(bud: Bud) {
    if (!bud.isRoot) return bud

    if (!bud.context.debug) {
      this.logger.log(`debug mode disabled. skipping write.`)
      return bud
    }

    const getData = (bud: Bud) => ({
      ...omit(bud.context, [`env`, `stdout`, `stderr`, `stdin`]),
      bootstrap: {
        args: args.raw,
        resolutions: bud.module.resolutions ?? {},
      },
      children: bud.children
        ? Object.values(bud.children).map(getData)
        : [],
      env: bud.env.getKeys(),
      loaded: Object.entries(bud.extensions?.repository).map(
        ([key, extension]) => ({
          key,
          ...(`label` in extension ? {label: extension.label} : {}),
          ...(`meta` in extension ? {meta: extension.meta} : {}),
          ...(`options` in extension ? {options: extension.options} : {}),
        }),
      ),
    })

    await bud.fs
      .write(
        bud.path(`@storage`, bud.label, `debug`, `profile.yml`),
        getData(bud),
      )
      .catch(this.logger.error)
      .finally(() => {
        this.logger.log(`profile.yml written to disk`)
      })

    await bud.fs
      .write(
        bud.path(`@storage`, bud.label, `debug`, `build.config.yml`),
        bud.hasChildren
          ? Object.entries(bud.children).reduce(
              (acc, [label, bud]) => ({...acc, [label]: bud.build.config}),
              {},
            )
          : bud.build.config,
      )
      .catch(this.logger.error)
      .finally(() => {
        this.logger.log(`build.config.yml written to disk`)
      })

    return bud
  }
}
