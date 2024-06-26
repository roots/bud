import type {Bud} from '@roots/bud-framework'
import type {Compiler as BudCompiler} from '@roots/bud-framework'
import type {
  MultiCompiler,
  MultiStats,
  Webpack,
} from '@roots/bud-framework/config'

import {cpus} from 'node:os'
import process from 'node:process'
import {pathToFileURL} from 'node:url'

import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import isNumber from '@roots/bud-support/isNumber'
import stripAnsi from '@roots/bud-support/strip-ansi'

import {makeErrorFormatter} from './formatError.js'
import {makeNoticeTitle} from './makeNoticeTitle.js'

/**
 * {@link BudCompiler} implementation
 */
class Compiler extends Service implements BudCompiler {
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
   * {@link BudCompiler.onStats}
   */
  @bind
  public onStats(stats: MultiStats) {
    this.stats = stats.toJson({
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
    })
    this.app.dashboard.render(stats)

    if (stats.hasErrors()) {
      process.exitCode = 1

      const format = makeErrorFormatter(this.stats)
      this.stats.children = this.stats.children?.map(child => ({
        ...child,
        errors:
          (child.errors
            ? child.errors?.map(format).filter(Boolean)
            : child.errors) ?? [],
      }))

      this.stats.children
        ?.filter(
          child => isNumber(child.errorsCount) && child.errorsCount > 0,
        )
        .forEach(child => {
          const error = child.errors?.shift()
          if (!error) return

          this.app.notifier.notify({
            group: `${this.app.label}-${child.name}`,
            message: stripAnsi(error.message),
            open: error.file ? pathToFileURL(error.file) : ``,
            subtitle: error.file ? `Error in ${error.name}` : error.name,
            title: makeNoticeTitle(this.app, child),
          })

          error.file && this.app.notifier.openEditor(error.file)
        })
    }

    this.stats.children?.forEach(child => {
      this.app.notifier.notify({
        group: `${this.app.label}-${child.name}`,
        message: child.modules
          ? `${child.modules.length} modules compiled`
          : `Modules compiled successfully`,
        open: this.app.server?.publicUrl.href,
        subtitle: `Build successful`,
        title: makeNoticeTitle(this.app, child),
      })

      this.app.server?.publicUrl.href &&
        this.app.context.browser &&
        this.app.notifier.openBrowser(this.app.server?.publicUrl.href)
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
          Object.values(bud.children).map(
            async (child: Bud) => await child.build.make(),
          ),
        )

    this.config = config?.filter(Boolean)

    if (this.config.length > 1) {
      this.config.parallelism = Math.max(cpus().length - 1, 1)
      this.logger.info(`parallel compilations: ${this.config.parallelism}`)
    }

    await bud.hooks.fire(`compiler.before`, bud)

    this.instance = this.implementation(this.config)
    this.instance.hooks.done.tap(bud.label, this.onStats)
    this.instance.hooks.done.tap(`${bud.label}-compiler.done`, stats =>
      bud.hooks.fire(`compiler.done`, bud, stats),
    )

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
}

export {Compiler as default}
