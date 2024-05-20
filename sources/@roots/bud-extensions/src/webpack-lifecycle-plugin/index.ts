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
  /**
   * {@link Extension.apply}
   */
  @bind
  public override apply(compiler: Compiler) {
    const hooks = [
      `afterCompile`,
      `assetEmitted`,
      `beforeCompile`,
      `failed`,
      `shouldEmit`,
    ]
      .filter(k => k in compiler.hooks)
      .filter(k => k in this)
      .map(k => [compiler.hooks[k], this[k]])

    hooks.map(([hook, method]) => hook.tap(this.label, method))
  }

  /**
   * Asset emitted hook
   */
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

  /**
   * Before compile hook
   */
  @bind
  public beforeCompile(compilation: Compilation) {
    this.logger.log(`compilation started:`, compilation.hash)
  }

  /**
   * After compile hook
   */
  @bind
  public afterCompile(compilation: Compilation) {
    this.logger.log(`compilation completed:`, compilation.hash)
  }

  /**
   * Failed hook
   */
  @bind
  public failed(error: {error?: Error} & Error & Partial<WebpackError>) {
    this.app.catch(error)
    return error
  }

  /**
   * Should emit hook
   */
  @bind
  public shouldEmit() {
    return this.app.context.dry !== true
  }
}
