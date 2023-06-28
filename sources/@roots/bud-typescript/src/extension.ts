import type {Bud} from '@roots/bud-framework'
import type * as TsLoader from 'ts-loader'

import {
  DynamicOption,
  Extension,
  type OptionCallbackValue,
} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import omit from '@roots/bud-support/lodash/omit'

/**
 * Typescript configuration options
 */
interface Options extends TsLoader.Options {
  allowTsInNodeModules: boolean
  appendTsSuffixTo: (RegExp | string)[]
  appendTsxSuffixTo: (RegExp | string)[]
  babel: boolean
  colors: boolean
  compiler: string
  compilerOptions: TsLoader.Options['compilerOptions']
  configFile: string
  context: string
  errorFormatter: TsLoader.Options['errorFormatter']
  experimentalFileCaching: boolean
  experimentalWatchApi: boolean
  getCustomTransformers: TsLoader.Options['getCustomTransformers']
  happyPackMode: boolean
  ignoreDiagnostics: number[]
  instance: string
  logInfoToStdOut: boolean
  logLevel: TsLoader.Options['logLevel']
  onlyCompileBundledFiles: boolean
  projectReferences: boolean
  reportFiles: string[]
  resolveModuleName: TsLoader.Options['resolveModuleName']
  resolveTypeReferenceDirective: TsLoader.Options['resolveTypeReferenceDirective']
  silent: boolean
  transpileOnly: boolean
  useCaseSensitiveFileNames?: boolean
}

/**
 * Typescript configuration
 */
@label(`@roots/bud-typescript`)
@expose(`typescript`)
@options<Options>({
  appendTsSuffixTo: [],
  appendTsxSuffixTo: [],
  babel: false,
  compilerOptions: undefined,
  configFile: `tsconfig.json`,
  context: DynamicOption.make(({path}) => path()),
  transpileOnly: true,
})
@dependsOn([`@roots/bud-typescript/typecheck`])
export default class BudTypeScript extends Extension<Options> {
  public declare appendTsSuffixTo: Options['appendTsSuffixTo']

  public declare appendTsxSuffixTo: Options['appendTsxSuffixTo']

  public declare babel: Options['babel']
  public declare compilerOptions: Options['compilerOptions']
  public declare configFile: Options['configFile']

  public declare context: Options['context']
  public declare getAppendTsSuffixTo: () => Options['appendTsSuffixTo']
  public declare getAppendTsxSuffixTo: () => Options['appendTsxSuffixTo']

  public declare getBabel: () => Options['babel']
  public declare getCompilerOptions: () => Options['compilerOptions']
  public declare getConfigFile: () => Options['configFile']

  public declare getContext: () => Options['context']
  public declare getTranspileOnly: () => Options['transpileOnly']
  public declare setAppendTsSuffixTo: (
    suffixes: OptionCallbackValue<Options, 'appendTsSuffixTo'>,
  ) => this

  public declare setAppendTsxSuffixTo: (
    suffixes: OptionCallbackValue<Options, 'appendTsxSuffixTo'>,
  ) => this
  public declare setBabel: (
    enable: OptionCallbackValue<Options, 'babel'>,
  ) => this
  public declare setCompilerOptions: (
    enable: OptionCallbackValue<Options, 'compilerOptions'>,
  ) => this

  public declare setConfigFile: (
    enable: OptionCallbackValue<Options, 'configFile'>,
  ) => this
  public declare setContext: (
    enable: OptionCallbackValue<Options, 'context'>,
  ) => this
  public declare setTranspileOnly: (
    enable: OptionCallbackValue<Options, 'transpileOnly'>,
  ) => this

  public declare transpileOnly: Options['transpileOnly']
  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async buildBefore({build}: Bud) {
    /**
     * Warn if no tsconfig.json was found or explicitly provided
     */
    if (!this.getConfigFile())
      this.logger.warn(
        `No tsconfig.json found. You should create one in your project root or specify one with the \`configFile\` option.`,
      )

    const items: [`ts`, `babel`?] = [`ts`]
    if (this.get(`babel`) && `babel` in build.items.babel)
      items.unshift(`babel`)

    build.rules.ts.setUse(items)
    build.rules.js.setUse(items)
  }
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, context, hooks}: Bud) {
    const loader = await this.resolve(`ts-loader`, import.meta.url)
    if (!loader) return this.logger.error(`ts-loader not found`)

    const typescript = await this.resolve(`typescript`, import.meta.url)
    if (!typescript) return this.logger.error(`typescript not found`)

    /**
     * If a tsconfig.json file is present
     */
    if (
      context.files[`tsconfig`].path &&
      context.files[`tsconfig`].type === `json`
    ) {
      // Set the tsconfig file path
      this.setConfigFile(context.files[`tsconfig`].path)
    }

    /**
     * Set the compiler and context options
     */
    this.setContext(context.basedir)

    /**
     * Resolve .ts, .tsx, .jsx extensions
     */
    hooks.on(`build.resolve.extensions`, (extensions = new Set([])) =>
      extensions
        .add(`.ts`)
        .add(`.jsx`)
        .add(`.tsx`)
        .add(`.mts`)
        .add(`.cts`),
    )

    hooks.on(`build.resolveLoader.alias`, (alias = {}) => ({
      ...alias,
      [`ts-loader`]: loader,
    }))

    build
      .setLoader(`ts`, `ts-loader`)
      .setItem(`ts`, {
        loader: `ts`,
        options: () =>
          Object.entries(omit(this.options, `babel`) ?? {}).reduce(
            (a, [k, v]) => (isUndefined(v) ? a : {...a, [k]: v}),
            {},
          ),
        resolve: {
          fullySpecified: false,
        },
      })
      .setRule(`ts`, {
        include: [({path}) => path(`@src`)],
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        use: [`ts`],
      })
  }

  /**
   * Typechecking controls
   */
  public get typecheck() {
    return this.app.extensions.get(`@roots/bud-typescript/typecheck`)
  }

  /**
   * Disable or enable babel
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.typescript.set('babel', false)
   * ```
   */
  @bind
  @deprecated(`bud.typescript`, `Use bud.typescript.set instead`, [
    [`Enable babel`, `bud.typescript.set('babel', true)`],
    [`Disable babel`, `bud.typescript.set('babel', false)`],
  ])
  public useBabel(enable: boolean = true): this {
    this.setBabel(enable)
    return this
  }
}
