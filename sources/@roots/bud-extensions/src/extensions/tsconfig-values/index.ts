import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import isString from '@roots/bud-support/lodash/isString'

type Options = Record<string, any>

/**
 * Read tsconfig values and apply to bud.js
 */
@label(`@roots/bud-extensions/tsconfig-values`)
@expose(`tsconfig`)
@options<Options>({})
@disabled
export default class BudTsConfigValues extends Extension<Options> {
  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    this.setOptions(
      bud.context.files[`tsconfig.json`]?.module ??
        bud.context.files[`jsconfig.json`]?.module ??
        {},
    )

    if (this.get(`bud.useCompilerOptions`)) this.enable()
  }

  /**
   * {@link Extension.buildBefore}
   */
  public override async configAfter(bud: Bud) {
    if (!this.enabled) return

    const baseDir =
      this.get(`compilerOptions.rootDir`) ??
      this.get(`compilerOptions.baseUrl`)

    if (baseDir) {
      this.logger.log(
        `setting @src dir as specified in jsconfig/tsconfig: ${baseDir}`,
      )
      bud.setPath({'@src': baseDir})
    }
    const outDir = this.get(`compilerOptions.outDir`)
    if (outDir) {
      this.logger.log(
        `setting @dist dir as specified in jsconfig/tsconfig: ${outDir}`,
      )
      bud.setPath({'@dist': outDir})
    }

    const tsConfigPaths = this.get(`compilerOptions.paths`)
      ? Object.entries(this.get(`compilerOptions.paths`))
          .map(([k, v]: [string, Array<string>]) => [k, v[0]])
          .map(tuple => tuple.map((str: string) => str.replace(`/*`, ``)))
          .reduce(
            (acc, [key, value]): Record<string, string> => ({
              ...(acc ?? {}),
              [key]: baseDir
                ? bud.path(join(baseDir, value))
                : bud.path(value),
            }),
            {},
          )
      : {}

    if (tsConfigPaths) {
      ;[
        bud.setPath,
        // @ts-ignore
        bud.alias,
      ].forEach(fn => fn(tsConfigPaths))
    }

    const include: Array<string> = this.get(`include`)
    const directories: Array<string> = (
      await Promise.all(
        include.map(async (path: string) => {
          const type = await bud.fs.exists(path)
          return type === `dir` && !path.match(/^\.?\/?config/)
            ? path
            : undefined
        }),
      )
    ).filter(isString)

    if (directories.length) {
      this.logger.log(
        `compiling paths as specified in jsconfig/tsconfig:`,
        ...directories,
      )
      // @ts-ignore
      bud.compilePaths(directories.map((path: string) => bud.path(path)))
    }
  }
}
