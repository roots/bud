import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {
  Extension,
  type OptionsCallback,
} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'

interface CompilerOptions {
  rootDir?: string
  baseUrl?: string
  outDir?: string
  paths?: Record<string, Array<string>>
}

interface BudOptions {
  useCompilerOptions?: boolean
}

interface Options {
  compilerOptions?: CompilerOptions
  include?: Array<string>
  exclude?: Array<string>
  bud?: BudOptions
}

/**
 * Tsconfig configuration
 */
@label(`@roots/bud-extensions/tsconfig-values`)
@expose(`tsconfig`)
@options<Options>({
  compilerOptions: undefined,
  include: undefined,
  exclude: undefined,
  bud: undefined,
})
@disabled
export default class BudTsConfigValues extends Extension<Options> {
  /**
   * compilerOptions value
   * @see https://www.typescriptlang.org/tsconfig#compilerOptions
   */
  public declare compilerOptions: CompilerOptions
  /**
   * Get compilerOptions
   * @returns CompilerOptions
   * @see https://www.typescriptlang.org/tsconfig#compilerOptions
   */
  public declare getCompilerOptions: () => CompilerOptions
  /**
   * Set compilerOptions
   * @param options CompilerOptions
   * @returns this
   * @see https://www.typescriptlang.org/tsconfig#compilerOptions
   */
  public declare setCompilerOptions: (
    options: OptionsCallback<Options, 'compilerOptions'>,
  ) => this

  /**
   * include value
   * @see https://www.typescriptlang.org/tsconfig#include
   */
  public declare include: Options['include']
  /**
   * Get include
   * @returns include
   * @see https://www.typescriptlang.org/tsconfig#include
   */
  public declare getInclude: () => Options['include']
  /**
   * Set include
   * @param options include
   * @returns this
   * @see https://www.typescriptlang.org/tsconfig#include
   */
  public declare setInclude: (
    options: OptionsCallback<Options, 'include'>,
  ) => this

  /**
   * tsconfig.exclude value
   * @see https://www.typescriptlang.org/tsconfig#exclude
   */
  public declare exclude: Options['exclude']
  /**
   * Get exclude
   * @returns exclude
   * @see https://www.typescriptlang.org/tsconfig#exclude
   */
  public declare getExclude: () => Options['exclude']
  /**
   * Set exclude
   * @param options exclude
   * @returns this
   * @see https://www.typescriptlang.org/tsconfig#exclude
   */
  public declare setExclude: (
    options: OptionsCallback<Options, 'exclude'>,
  ) => this

  /**
   * bud value
   */
  public declare bud: Options['bud']
  /**
   * Get bud
   * @returns tsconfig.bud value
   */
  public declare getBud: () => Options['bud']
  /**
   * Set bud
   * @param options bud
   * @returns this
   */
  public declare setBud: (options: OptionsCallback<Options, 'bud'>) => this

  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    const tsConfig: Options =
      bud.context.files[`tsconfig.json`]?.module ??
      bud.context.files[`jsconfig.json`]?.module

    if (tsConfig?.compilerOptions)
      this.setCompilerOptions(tsConfig.compilerOptions)
    if (tsConfig?.include) this.setInclude(tsConfig.include)
    if (tsConfig?.exclude) this.setExclude(tsConfig.exclude)
    if (tsConfig?.bud) this.setBud(tsConfig.bud)

    if (this.getBud()?.useCompilerOptions) this.enable()
  }

  /**
   * {@link Extension.buildBefore}
   */
  public override async configAfter(bud: Bud) {
    if (!this.enabled) return

    const baseDir =
      this.getCompilerOptions()?.rootDir ??
      this.getCompilerOptions()?.baseUrl
    if (baseDir) {
      this.logger.log(
        `setting @src dir as specified in jsconfig/tsconfig: ${baseDir}`,
      )
      bud.setPath({'@src': baseDir})
    }

    const outDir = this.getCompilerOptions()?.outDir
    if (outDir) {
      this.logger.log(
        `setting @dist dir as specified in jsconfig/tsconfig: ${outDir}`,
      )
      bud.setPath({'@dist': outDir})
    }

    const paths = this.getCompilerOptions()?.paths
    if (paths) {
      ;[
        bud.setPath,
        // @ts-ignore
        bud.alias,
      ].forEach(fn => fn(this.resolvePaths(paths)))
    }

    const include = this.getInclude()
    if (include) {
      const directories = (
        await Promise.all(
          include.map(async (path: string) => {
            const type = await bud.fs.exists(path)
            return type === `dir` && !path.match(/^\.?\/?config/)
              ? path
              : undefined
          }),
        )
      ).filter(isString)

      if (directories)
        // @ts-ignore
        bud.compilePaths(directories.map((path: string) => bud.path(path)))
    }
  }

  @bind
  public makeAbsolute(path: string): string {
    const baseDir =
      this.getCompilerOptions()?.rootDir ??
      this.getCompilerOptions()?.baseUrl

    return baseDir ? join(baseDir, path) : path
  }

  @bind
  public resolvePaths(
    paths: Options['compilerOptions']['paths'],
  ): Record<string, string> | undefined {
    if (!paths) return

    return Object.entries(paths)
      .map(([k, v]: [string, Array<string>]) => [k, v[0]])
      .map(tuple => tuple.map((str: string) => str.replace(`/*`, ``)))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: this.makeAbsolute(value),
        }),
        {},
      )
  }
}
