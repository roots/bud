import type {Compilation, Compiler} from '@roots/bud-framework/config'

import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * Webpack lifecycle plugin
 */
@label(`@roots/bud-extensions/webpack-lifecycle-plugin`)
export default class BudWebpackLifecyclePlugin extends Extension {
  @bind
  public async additionalPass() {}

  @bind
  public async afterCompile(compilation: Compilation) {
    this.logger.log(`compilation completed:`, compilation.hash)
    this.logger.timeEnd(`compile`)
  }

  @bind
  public async afterEmit(compilation: Compilation) {
    this.logger.timeEnd(`emit`)
  }

  @bind
  public afterEnvironment() {}

  @bind
  public afterPlugins() {}

  /**
   * {@link Extension.apply}
   */
  @bind
  public override apply(compiler: Compiler) {
    ;[
      `environment`,
      `afterEnvironment`,
      `afterResolvers`,
      `afterPlugins`,
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
            try {
              await this[k](...args)
            } catch (error) {
              this.logger.error(error)
            }
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
  public async beforeCompile(compilationParams: any) {}

  @bind
  public async beforeRun(compiler: Compiler) {
    this.logger.log(`beforeRun`, compiler.name)
  }

  @bind
  public compile(...compilationParams: any[]) {}

  @bind
  public async emit(compilation: Compilation) {
    this.logger.time(`emit`)
  }

  @bind
  public environment() {}

  @bind
  public failed(error: Error) {
    this.logger.error(`compilation failed`)

    if (
      error.message.includes(
        `Module not found: Error: Can't resolve 'index' in '${this.app.path(
          `@src`,
        )}'`,
      ) &&
      !this.app.hooks.filter(`build.entry`)
    ) {
      this.logger.error(
        `\n\nNo entrypoints found.\n\nEither create a file at ${this.app.relPath(
          `@src`,
          `index.js`,
        )} or use the bud.entry method to specify an entrypoint.`,
      )
    }
  }

  @bind
  public initialize() {}

  @bind
  public invalid() {}

  @bind
  public async run(compiler: Compiler) {
    this.logger.log(`run`, compiler.name)
  }

  @bind
  public shouldEmit() {
    // @ts-ignore
    const emitCheck = this.app.context.dry !== true
    emitCheck ? this.logger.success(`emit`) : this.logger.log(`dry run`)
    return emitCheck
  }

  @bind
  public thisCompilation(compilation: Compilation) {
    this.logger.time(`compile`)
  }
}
