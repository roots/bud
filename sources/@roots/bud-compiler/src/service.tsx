import type {Bud} from '@roots/bud-framework'
import type {
  MultiCompiler,
  MultiStats,
  Stats,
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
import {BudError, type BudHandler} from '@roots/bud-support/errors'
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
   * Compilation stats
   */
  public compilationStats: StatsCompilation

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
   * Raw stats
   */
  public stats: Contract.Service[`stats`]

  /**
   * Initiates compilation
   */
  @bind
  public async compile(bud: Bud): Promise<MultiCompiler> {
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
        .fire(`compiler.done`, [this.app, this.stats])
        .catch(error => {
          throw error
        })
    })

    return this.instance
  }

  /**
   * Compiler error event
   */
  @bind
  public async onError(error: BudHandler | webpack.WebpackError) {
    global.process.exitCode = 1

    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    await this.app.hooks
      .fire(`compiler.error`, error)
      .catch(this.app.error)

    this.app.notifier.notify({
      group: this.app.label,
      message: error.message,
      subtitle: error.name,
    })

    if (`isBudError` in error) {
      render(<Error error={error} />)
    } else {
      render(<Error error={BudError.normalize(error)} />)
    }
  }

  /**
   * Stats handler
   */
  @bind
  public async onStats(stats: Stats & MultiStats) {
    const makeNoticeTitle = (child: StatsCompilation) =>
      this.app.label !== child.name
        ? `${this.app.label} (${child.name})`
        : child.name

    this.stats = stats

    this.compilationStats = stats.toJson({
      all: false,
      children: {
        all: false,
        assets: true,
        builtAt: true,
        cachedAssets: false,
        cachedModules: false,
        children: true,
        chunks: false,
        entrypoints: true,
        errors: true,
        errorsCount: true,
        hash: true,
        modules: true,
        outputPath: true,
        timings: true,
        warnings: true,
        warningsCount: true,
      },
      hash: true,
      timings: true,
    })

    const promisedDashboardUpdate = this.app.dashboard
      .update(this.compilationStats)
      .catch(error => {
        this.app.error(error)
      })

    await this.app.hooks.fire(`compiler.stats`, stats)

    if (stats.hasErrors()) {
      global.process.exitCode = 1

      this.compilationStats.children = this.compilationStats.children?.map(
        child => ({
          ...child,
          errors: this.sourceErrors(child.errors),
        }),
      )

      this.compilationStats.children
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

    this.compilationStats.children
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

    await promisedDashboardUpdate
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async register(bud: Bud): Promise<any> {
    this.implementation = await this.app.module
      .import(`webpack`, import.meta.url)
      .catch(error => {
        throw BudError.normalize(error)
      })
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

        const moduleIdent = error.moduleId ?? error.moduleName

        const module = this.compilationStats.children
          .flatMap(child => child?.modules)
          .find(
            module =>
              module?.id === moduleIdent || module?.name === moduleIdent,
          )

        if (!module) return error

        if (module.nameForCondition) {
          file = module.nameForCondition
        } else if (module.name) {
          file = this.app.path(`@src`, module.name)
        }

        return !file
          ? {...error, name: module.name ?? error.name}
          : {...error, file, name: module.name ?? error.name}
      }

      return errors?.map(parseError).filter(Boolean)
    } catch (error) {
      this.app.warn(`error parsing errors`, error)
      return []
    }
  }
}
