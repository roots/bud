import type {
  Compilation,
  Compiler,
  WebpackError,
} from '@roots/bud-framework/config'

import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * Webpack lifecycle plugin
 */
@label(`@roots/bud-extensions/webpack-lifecycle-plugin`)
export default class BudWebpackLifecyclePlugin extends Extension {
  @bind
  public async afterCompile(compilation: Compilation) {
    this.logger.log(`compilation completed:`, compilation.hash)
    this.logger.timeEnd(`compile`)
  }

  @bind
  public async afterEmit(_compilation: Compilation) {
    this.logger.timeEnd(`emit`)
  }

  /**
   * {@link Extension.apply}
   * {@link WebpackPluginInstance.apply}
   */
  @bind
  public override apply(compiler: Compiler) {
    ;[
      `environment`,
      `afterResolvers`,
      `compile`,
      `failed`,
      `invalid`,
      `initialize`,
      `shouldEmit`,
      `thisCompilation`,
    ]
      .filter(k => compiler.hooks[k])
      .filter(k => this[k])
      .map(k => compiler.hooks[k].tap(this.label, this[k]))
    ;[
      `additionalPass`,
      `afterCompile`,
      `afterEmit`,
      `assetEmitted`,
      `beforeCompile`,
      `beforeRun`,
      `emit`,
      `run`,
    ]
      .filter(k => compiler.hooks[k])
      .filter(k => this[k])
      .map(k =>
        compiler.hooks[k].tapPromise(
          this.label,
          async (...args: any[]) => {
            await this[k](...args)
          },
        ),
      )
  }

  @bind
  public async assetEmitted(
    file: string,
    info: {
      compilation: Compilation
      content: string
      outputPath: string
      source: string
      targetPath: string
    },
  ) {
    this.logger.log(
      `asset emitted:`,
      file,
      `=>`,
      this.app.relPath(info.targetPath),
    )
  }

  @bind
  public async emit(compilation: Compilation) {
    this.logger.time(`emit`)
  }

  @bind
  public failed(error: Error & Partial<WebpackError> & {error?: Error}) {
    const {message, name} = error

    const moduleNotFoundError = name === `ModuleNotFoundError`

    error.name = name
    error.message = message

    if (moduleNotFoundError) {
      if (
        error.message.includes(
          `Error: Can't resolve 'index' in '${this.app.path(`@src`)}'`,
        )
      ) {
        error.message = error.message.replace(
          `Module not found: Error: Can't resolve 'index' in '${this.app.path(
            `@src`,
          )}'`,
          `Either create a file at ${this.app.relPath(
            `@src/index.js`,
          )} or specify the path to your entry file with bud.entry`,
        )
        return error
      }
    }

    return error
  }

  @bind
  public async run(compiler: Compiler) {
    this.logger.log(`run`, compiler.name)
  }

  @bind
  public shouldEmit() {
    return this.app.context.dry !== true
  }

  @bind
  public thisCompilation(compilation: Compilation) {
    this.logger.time(`compile`)
  }
}
