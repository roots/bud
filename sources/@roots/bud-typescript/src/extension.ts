import type {Bud} from '@roots/bud-framework'
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
import type * as TsLoader from 'ts-loader'

/**
 * Typescript configuration options
 */
interface Options extends TsLoader.Options {
  babel: boolean
  silent: boolean
  logLevel: TsLoader.Options['logLevel']
  logInfoToStdOut: boolean
  instance: string
  compiler: string
  configFile: string
  context: string
  transpileOnly: boolean
  ignoreDiagnostics: number[]
  reportFiles: string[]
  errorFormatter: TsLoader.Options['errorFormatter']
  onlyCompileBundledFiles: boolean
  colors: boolean
  compilerOptions: TsLoader.Options['compilerOptions']
  appendTsSuffixTo: (RegExp | string)[]
  appendTsxSuffixTo: (RegExp | string)[]
  happyPackMode: boolean
  getCustomTransformers: TsLoader.Options['getCustomTransformers']
  experimentalWatchApi: boolean
  allowTsInNodeModules: boolean
  experimentalFileCaching: boolean
  projectReferences: boolean
  resolveModuleName: TsLoader.Options['resolveModuleName']
  resolveTypeReferenceDirective: TsLoader.Options['resolveTypeReferenceDirective']
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

  public declare appendTsSuffixTo: Options['appendTsSuffixTo']
  public declare getAppendTsSuffixTo: () => Options['appendTsSuffixTo']
  public declare setAppendTsSuffixTo: (
    suffixes: OptionCallbackValue<Options, 'appendTsSuffixTo'>,
  ) => this

  public declare appendTsxSuffixTo: Options['appendTsxSuffixTo']
  public declare getAppendTsxSuffixTo: () => Options['appendTsxSuffixTo']
  public declare setAppendTsxSuffixTo: (
    suffixes: OptionCallbackValue<Options, 'appendTsxSuffixTo'>,
  ) => this

  public declare babel: Options['babel']
  public declare getBabel: () => Options['babel']
  public declare setBabel: (
    enable: OptionCallbackValue<Options, 'babel'>,
  ) => this

  public declare compilerOptions: Options['compilerOptions']
  public declare getCompilerOptions: () => Options['compilerOptions']
  public declare setCompilerOptions: (
    enable: OptionCallbackValue<Options, 'compilerOptions'>,
  ) => this

  public declare configFile: Options['configFile']
  public declare getConfigFile: () => Options['configFile']
  public declare setConfigFile: (
    enable: OptionCallbackValue<Options, 'configFile'>,
  ) => this

  public declare context: Options['context']
  public declare getContext: () => Options['context']
  public declare setContext: (
    enable: OptionCallbackValue<Options, 'context'>,
  ) => this

  public declare transpileOnly: Options['transpileOnly']
  public declare getTranspileOnly: () => Options['transpileOnly']
  public declare setTranspileOnly: (
    enable: OptionCallbackValue<Options, 'transpileOnly'>,
  ) => this

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
    if (context.files[`tsconfig.json`]) {
      // Set the tsconfig.json file path
      this.setConfigFile(context.files[`tsconfig.json`].path)
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
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
        use: [`ts`],
      })
  }

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
}
