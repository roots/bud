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

import {Error} from '@roots/bud-dashboard/app'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import {duration} from '@roots/bud-support/human-readable'
import {render} from '@roots/bud-support/ink'
import stripAnsi from '@roots/bud-support/strip-ansi'
import webpack from '@roots/bud-support/webpack'
import {pathToFileURL} from 'node:url'

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
    const compilerPath = await this.app.module
      .resolve(`webpack`, import.meta.url)
      .catch(error => {
        throw BudError.normalize(error)
      })

    this.implementation = await this.app.module
      .import(compilerPath, import.meta.url)
      .catch(error => {
        throw BudError.normalize(error)
      })
      .finally(() => {
        this.logger.info(`imported webpack from ${compilerPath}`)
      })

    this.config = !this.app.hasChildren
      ? [await this.app.build.make()]
      : await Promise.all(
          Object.values(this.app.children).map(
            async (child: Bud) =>
              await child.build.make().catch(error => {
                throw error
              }),
          ),
        )

    await this.app.hooks.fire(`compiler.before`, this.app)

    this.logger.timeEnd(`initialize`)

    try {
      this.instance = this.implementation(this.config)
    } catch (error) {
      throw BudError.normalize(error)
    }

    this.instance.hooks.done.tap(this.app.label, async (stats: any) => {
      await this.onStats(stats)
      await this.app.hooks
        .fire(`compiler.after`, this.app)
        .catch(error => {
          this.logger.error(error)
        })

      await this.app.hooks
        .fire(`compiler.close`, this.app)
        .catch(error => {
          this.logger.error(error)
        })
    })

    return this.instance
  }

  /**
   * Compiler error event
   */
  @bind
  public async onError(error: webpack.WebpackError) {
    global.process.exitCode = 1

    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    // @eslint-disable-next-line no-console
    render(
      <Error
        {...new BudError(error.message, {
          props: {
            error: BudError.normalize(error),
          },
        })}
      />,
    )

    await this.app.hooks.fire(`compiler.error`, error)

    this.app.notifier.notify({
      group: this.app.label,
      message: error.message,
      subtitle: error.name,
    })
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

        if (!module) return error

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
