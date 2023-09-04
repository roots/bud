import type {Bud} from '@roots/bud-framework'
import type {Compiler as BudCompiler} from '@roots/bud-framework'
import type {
  MultiCompiler,
  MultiStats,
  Stats,
  StatsCompilation,
  StatsError,
  Webpack,
} from '@roots/bud-framework/config'
import type {
  ErrorWithSourceFile,
  SourceFile,
} from '@roots/bud-support/open'

import {cpus} from 'node:os'
import process from 'node:process'
import {pathToFileURL} from 'node:url'

import {Error as DisplayError} from '@roots/bud-dashboard/components/error'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import {render} from '@roots/bud-support/ink'
import isNull from '@roots/bud-support/lodash/isNull'
import isNumber from '@roots/bud-support/lodash/isNumber'
import isString from '@roots/bud-support/lodash/isString'
import stripAnsi from '@roots/bud-support/strip-ansi'

/**
 * {@link BudCompiler} implementation
 */
class Compiler extends Service implements BudCompiler {
  /**
   * {@link BudCompiler.compilationStats}
   */
  public declare compilationStats: BudCompiler[`compilationStats`]

  /**
   * {@link BudCompiler.config}
   */
  public config: BudCompiler[`config`] = []

  /**
   * {@link BudCompiler.implementation}
   */
  public implementation: BudCompiler[`implementation`] & typeof Webpack

  /**
   * {@link BudCompiler.instance}
   */
  public declare instance: BudCompiler[`instance`]

  /**
   * {@link BudCompiler.stats}
   */
  public declare stats: BudCompiler[`stats`]

  /**
   * {@link BudCompiler.onError}
   */
  @bind
  public onError(error: Error) {
    process.exitCode = 1
    if (!error) return

    this.app.server?.appliedMiddleware?.hot?.publish({error})

    this.app.notifier?.notify({
      group: this.app.label,
      message: error.message,
      subtitle: error.name,
    })

    if (`isBudError` in error) {
      render(<DisplayError error={error} />)
    } else {
      render(<DisplayError error={BudError.normalize(error)} />)
    }
  }
  /**
   * {@link BudCompiler.onStats}
   */
  @bind
  public onStats(stats: Stats & MultiStats) {
    const makeNoticeTitle = (child: StatsCompilation) =>
      this.app.label !== child.name
        ? `${this.app.label} (${child.name})`
        : child.name

    this.stats = stats

    this.compilationStats = stats.toJson(statsOptions)

    this.app.dashboard.updateStats(this.compilationStats)

    if (stats.hasErrors()) {
      process.exitCode = 1

      this.compilationStats.children = this.compilationStats.children?.map(
        child => ({
          ...child,
          errors:
            child.errors && this.sourceErrors
              ? this.sourceErrors(child.errors)
              : child.errors ?? [],
        }),
      )

      this.compilationStats.children
        ?.filter(
          child => isNumber(child.errorsCount) && child.errorsCount > 0,
        )
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

            error.file && this.app.notifier.openEditor(error.file)
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
              ? `${child.modules.length} modules compiled`
              : `Modules compiled successfully`,
            open: this.app.server?.publicUrl.href,
            subtitle: `Build successful`,
            title: makeNoticeTitle(child),
          })

          this.app.server?.publicUrl.href &&
            this.app.notifier.openBrowser(this.app.server?.publicUrl.href)
        } catch (error) {
          this.logger.error(error)
        }
      })
  }
  /**
   * {@link BudCompiler.compile}
   */
  @bind
  public async compile(bud: Bud): Promise<MultiCompiler> {
    const config = !bud.hasChildren
      ? [await bud.build.make()]
      : await Promise.all(
          Object.values(bud.children).map(async (child: Bud) =>
            child.build.make().catch(error => {
              throw error
            }),
          ),
        )

    this.config = config?.filter(Boolean)

    this.config.parallelism = Math.max(cpus().length - 1, 1)
    this.logger.info(`parallel compilations: ${this.config.parallelism}`)

    await bud.hooks.fire(`compiler.before`, bud).catch(error => {
      throw error
    })

    this.logger.timeEnd(`initialize`)
    this.app.dashboard.updateStatus(`compiling`)

    try {
      this.instance = this.implementation(this.config)
    } catch (error: unknown) {
      const normalError =
        error instanceof Error ? error : BudError.normalize(error)
      this.onError(normalError)
    }

    this.instance.hooks.done.tap(bud.label, (stats: any) => {
      this.onStats(stats)
      bud.hooks.fire(`compiler.done`, bud, this.stats).catch(this.onError)
    })

    return this.instance
  }

  /**
   * {@link Service.register}
   */
  @bind
  public override async register?(bud: Bud): Promise<any> {
    this.implementation = await bud.module
      .import(`@roots/bud-support/webpack`, import.meta.url)
      .catch(error => {
        throw BudError.normalize(error)
      })
  }

  @bind
  public sourceErrors?(
    errors: Array<StatsError> | undefined,
  ): Array<ErrorWithSourceFile | StatsError> {
    if (!errors || !errors.length) return []

    try {
      return errors
        ?.map((error: StatsError): ErrorWithSourceFile | StatsError => {
          let file: SourceFile[`file`] | undefined
          let module: undefined | Webpack.StatsModule

          const ident = error.moduleId ?? error.moduleName

          /**
           * In a perfect world webpack plugins would use the
           * `nameForCondition` property to identify the module.
           */
          if (ident && this.compilationStats?.children) {
            module = this.compilationStats.children
              .flatMap(child => child?.modules)
              .find(module => [module?.id, module?.name].includes(ident))
          }

          /**
           * If the module is not found, we try to parse the error message
           */
          if (!ident && error.message?.includes(`[stylelint]`)) {
            // try to get the origin of the stylelint error,
            // which is contained in the second line of the error message
            const unparsedOrigin = error.message?.split(`\n`)?.[1]

            // if the origin is not a string or too long, we return the error as-is
            if (!isString(unparsedOrigin) || unparsedOrigin.length > 100)
              return error

            // extract absolute path and context relative name of module
            const styleError = unparsedOrigin.match(
              /file:\/\/(.*)\x07(.*)\x1B]8;;/,
            )
            if (isNull(styleError)) return error

            // get parts of matched error
            const [, file, name] = styleError
            // return enriched error
            return {...error, file, name, nameForCondition: file}
          }

          /**
           * If the module is still not found, we return the error as-is
           */
          if (!module) return error

          /**
           * We'll prefer the `nameForCondition` property if it exists,
           * otherwise we'll use the `name` property.
           */
          if (module.nameForCondition) {
            file = module.nameForCondition
          } else if (module.name) {
            file = this.app.path(`@src`, module.name)
          }

          const name = module.name ?? error.name ?? `error`
          return {...error, file, name}
        })
        .filter(Boolean)
    } catch (error) {
      this.logger.warn(
        `Problem parsing errors. This probably won't break anything but please report it: https://github.com/roots/bud/issues/new`,
        error,
      )
      return errors
    }
  }
}

const statsOptions = {
  all: false,
  children: {
    all: false,
    assets: true,
    cached: true,
    cachedAssets: true,
    cachedModules: true,
    entrypoints: true,
    errorDetails: false,
    errors: true,
    errorsCount: true,
    hash: true,
    modules: true,
    name: true,
    outputPath: true,
    timings: true,
    warnings: true,
    warningsCount: true,
  },
}

export {Compiler as default}
