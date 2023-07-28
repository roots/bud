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
  public afterCompile(compilation: Compilation) {
    this.logger.log(`compilation completed:`, compilation.hash)
    this.logger.timeEnd(`compile`)
  }

  /**
   * {@link Extension.apply}
   * {@link WebpackPluginInstance.apply}
   */
  @bind
  public override apply(compiler: Compiler) {
    ;[
      `afterCompile`,
      `assetEmitted`,
      `beforeCompile`,
      `failed`,
      `shouldEmit`,
    ]
      .filter(k => compiler.hooks[k])
      .filter(k => this[k])
      .map(k => compiler.hooks[k].tap(this.label, this[k]))
    ;[`additionalPass`, `afterEmit`, `emit`]
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
  public assetEmitted(
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
  public beforeCompile(compilation: Compilation) {
    this.logger.time(`compile`)
  }

  @bind
  public emit(compilation: Compilation) {
    this.logger.time(`emit`)
  }

  @bind
  public failed(error: Error & Partial<WebpackError> & {error?: Error}) {
    this.app.compiler?.onError(error)
    return error
  }

  @bind
  public shouldEmit() {
    return this.app.context.dry !== true
  }
}
