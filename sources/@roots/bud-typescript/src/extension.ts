import type {Bud} from '@roots/bud-framework'
import type * as TsLoader from 'ts-loader'

import {
  DynamicOption,
  Extension,
  type Option,
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
  getCustomTransformers: undefined,
  instance: undefined,
  transpileOnly: true,
})
@dependsOn([`@roots/bud-typescript/typecheck`])
export default class BudTypeScript extends Extension<Options> {
  public declare appendTsSuffixTo: Option<
    BudTypeScript,
    Options,
    `appendTsSuffixTo`
  >[`value`]
  public declare getAppendTsSuffixTo: Option<
    BudTypeScript,
    Options,
    `appendTsSuffixTo`
  >[`get`]
  public declare setAppendTsSuffixTo: Option<
    BudTypeScript,
    Options,
    `appendTsSuffixTo`
  >[`set`]

  public declare appendTsxSuffixTo: Option<
    BudTypeScript,
    Options,
    `appendTsxSuffixTo`
  >[`value`]
  public declare getAppendTsxSuffixTo: () => Option<
    BudTypeScript,
    Options,
    `appendTsxSuffixTo`
  >[`get`]
  public declare setAppendTsxSuffixTo: Option<
    BudTypeScript,
    Options,
    `appendTsxSuffixTo`
  >[`set`]

  public declare babel: Option<BudTypeScript, Options, `babel`>[`value`]
  public declare getBabel: Option<BudTypeScript, Options, `babel`>[`get`]
  public declare setBabel: Option<BudTypeScript, Options, `babel`>[`set`]

  public declare compilerOptions: Option<
    BudTypeScript,
    Options,
    `compilerOptions`
  >[`value`]
  public declare getCompilerOptions: Option<
    BudTypeScript,
    Options,
    `compilerOptions`
  >[`get`]
  public declare setCompilerOptions: Option<
    BudTypeScript,
    Options,
    `compilerOptions`
  >[`set`]

  public declare configFile: Option<
    BudTypeScript,
    Options,
    `configFile`
  >[`value`]
  public declare getConfigFile: Option<
    BudTypeScript,
    Options,
    `configFile`
  >[`get`]
  public declare setConfigFile: Option<
    BudTypeScript,
    Options,
    `configFile`
  >[`set`]

  public declare context: Option<
    BudTypeScript,
    Options,
    `context`
  >[`value`]
  public declare getContext: Option<
    BudTypeScript,
    Options,
    `context`
  >[`get`]
  public declare setContext: Option<
    BudTypeScript,
    Options,
    `context`
  >[`set`]

  public declare getCustomTransformers: Option<
    BudTypeScript,
    Options,
    `getCustomTransformers`
  >[`value`]
  public declare getGetCustomTransformers: Option<
    BudTypeScript,
    Options,
    `getCustomTransformers`
  >[`get`]
  public declare setGetCustomTransformers: Option<
    BudTypeScript,
    Options,
    `getCustomTransformers`
  >[`set`]

  public declare instance: Option<
    BudTypeScript,
    Options,
    `instance`
  >[`value`]
  public declare getInstance: Option<
    BudTypeScript,
    Options,
    `instance`
  >[`get`]
  public declare setInstance: Option<
    BudTypeScript,
    Options,
    `instance`
  >[`set`]

  public declare transpileOnly: Option<
    BudTypeScript,
    Options,
    `transpileOnly`
  >[`value`]
  public declare getTranspileOnly: Option<
    BudTypeScript,
    Options,
    `transpileOnly`
  >[`get`]
  public declare setTranspileOnly: Option<
    BudTypeScript,
    Options,
    `transpileOnly`
  >[`set`]

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

    const typescriptPath = await this.resolve(
      `typescript`,
      import.meta.url,
    )
    if (!typescriptPath) {
      return this.logger.error(`typescript not found`)
    }

    /**
     * Set the instance path
     */
    this.setInstance(typescriptPath)

    /**
     * If a tsconfig.json file is present
     */
    if (
      context.files[`tsconfig`]?.path &&
      context.files[`tsconfig`]?.type === `json`
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
  @deprecated(`bud.typescript`, `Use bud.typescript.setBabel instead`, [
    [`Enable babel`, `bud.typescript.setBabel(true)`],
    [`Disable babel`, `bud.typescript.setBabel(false)`],
  ])
  public useBabel(enable: boolean = true): this {
    this.setBabel(enable)
    return this
  }
}
