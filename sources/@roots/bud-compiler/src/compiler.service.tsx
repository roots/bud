import type {Bud} from '@roots/bud-framework'
import type {
  MultiCompiler,
  MultiStats,
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'
import type {Compiler as Contract} from '@roots/bud-framework/services'
import type {
  ErrorWithSourceFile,
  SourceFile,
} from '@roots/bud-support/open'

import * as App from '@roots/bud-dashboard/app'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, CompilerError} from '@roots/bud-support/errors'
import {duration} from '@roots/bud-support/human-readable'
import * as Ink from '@roots/bud-support/ink'
import stripAnsi from '@roots/bud-support/strip-ansi'
import {pathToFileURL} from 'node:url'
import webpack from 'webpack'

/**
 * Wepback compilation controller class
 */
export class Compiler extends Service implements Contract.Service {
  /**
   * Configuration
   */
  public config: Contract.Service[`config`] = []

  /**
   * Compiler implementation
   */
  public implementation: typeof webpack

  /**
   * Compiler instance
   */
  public instance: Contract.Service[`instance`]

  /**
   * Compilation stats
   */
  public stats: Contract.Service[`stats`]

  /**
   * Initiates compilation
   */
  @bind
  public async compile(): Promise<MultiCompiler> {
    const compilerPath = await this.app.module.resolve(
      `webpack`,
      import.meta.url,
    )
    this.implementation = await this.app.module.import(
      compilerPath,
      import.meta.url,
    )
    this.logger.log(`imported webpack`, this.implementation.version)

    this.config = !this.app.hasChildren
      ? [await this.app.build.make()]
      : await Promise.all(
          Object.values(this.app.children).map(async (child: Bud) => {
            try {
              return await child.build.make()
            } catch (error) {
              throw error
            }
          }),
        )

    await this.app.hooks.fire(`compiler.before`, this.app)

    this.logger.timeEnd(`initialize`)

    this.logger.await(`compilation`)

    this.instance = this.implementation(this.config)
    this.instance.hooks.done.tap(this.app.label, async (stats: any) => {
      await this.onStats(stats)
      await this.app.hooks.fire(`compiler.close`, this.app)
    })

    await this.app.hooks.fire(`compiler.after`, this.app)

    return this.instance
  }

  /**
   * Compiler error event
   */
  @bind
  public async onError(error: Error) {
    process.exitCode = 1

    await this.app.hooks.fire(`compiler.error`, error)

    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    try {
      this.app.notifier.notify({
        group: this.app.label,
        message: error.message,
        subtitle: error.name,
      })
    } catch (error) {
      this.logger.error(error)
    }

    try {
      Ink.render(
        <App.Error
          error={
            new CompilerError(error.message, {
              props: {
                details: `This error was thrown by the webpack compiler itself. It is not the same as a syntax error. It is likely a missing or unresolvable build dependency.`,
                docs: new URL(`https://bud.js.org/`),
                issues: new URL(
                  `https://github.com/roots/bud/search?q=is:issue+"compiler" in:title`,
                ),
                stack: error.stack,
                thrownBy: `webpack`,
              },
            })
          }
        />,
      )
    } catch (error) {
      throw BudError.normalize(error)
    }
  }

  /**
   * Stats handler
   */
  @bind
  public async onStats(stats: MultiStats) {
    const makeNoticeTitle = (child: StatsCompilation) =>
      this.app.label !== child.name
        ? `${this.app.label} (${child.name})`
        : child.name

    this.stats = stats.toJson(this.app.hooks.filter(`build.stats`))

    await this.app.hooks.fire(`compiler.stats`, stats)

    const statsUpdate = this.app.dashboard.update(stats)

    if (stats.hasErrors()) {
      process.exitCode = 1

      this.stats.children = this.stats.children?.map(child => ({
        ...child,
        errors: this.sourceErrors(child.errors),
      }))

      this.stats.children
        ?.filter(child => child.errorsCount > 0)
        .forEach(child => {
          try {
            const error = child.errors?.shift()
            if (!error) return

            this.app.notifier.notify({
              group: `${this.app.label}-${child.name}`,
              message: stripAnsi(error.message),
              open: error.file ? pathToFileURL(error.file) : ``,
              subtitle: error.file ? `Error in ${error.name}` : error.name,
              title: makeNoticeTitle(child),
            })
            this.app.notifier.openEditor(error.file)
          } catch (error) {
            this.logger.error(error)
          }
        })
    }

    this.stats.children
      ?.filter(child => child.errorsCount === 0)
      .forEach(child => {
        try {
          this.app.notifier.notify({
            group: `${this.app.label}-${child.name}`,
            message: child.modules
              ? `${child.modules.length} modules compiled in ${duration(
                  child.time,
                )}`
              : `Compiled in ${duration(child.time)}`,
            open: this.app.server?.publicUrl.href,
            subtitle: `Build successful`,
            title: makeNoticeTitle(child),
          })
          this.app.notifier.openBrowser(this.app.server?.publicUrl.href)
        } catch (error) {
          this.logger.error(error)
        }
      })

    await statsUpdate
  }

  /**
   * Parse errors from webpack stats
   */
  @bind
  public sourceErrors(
    errors: Array<StatsError>,
  ): Array<ErrorWithSourceFile | StatsError> {
    if (!errors || !errors.length) return []

    try {
      const parseError = (
        error: StatsError,
      ): ErrorWithSourceFile | StatsError => {
        let file: SourceFile[`file`] | undefined

        const modules = this.stats.children.flatMap(child => child.modules)
        const moduleIdent = error.moduleId ?? error.moduleName

        const module = modules.find(
          module =>
            module?.id === moduleIdent || module?.name === moduleIdent,
        )

        if (!module) {
          return error
        }

        if (module.nameForCondition) {
          file = module.nameForCondition
        } else if (module.name) {
          file = this.app.path(`@src`, module.name)
        }

        if (!file) {
          return error
        }

        return {...error, file, name: module.name ?? error.name}
      }

      return errors?.map(parseError).filter(Boolean)
    } catch (error) {
      this.app.warn(`error parsing errors`, error)
      return []
    }
  }
}
