import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

/**
 * Esbuild options
 */
export interface Options {
  /**
   * Minify settings
   */
  minify: {
    /**
     * Esbuild should minify CSS
     */
    css: boolean
    /**
     * Patterns to be minified
     */
    include: string | RegExp | Array<string | RegExp>
    /**
     * Patterns to be excluded from minimization
     */
    exclude: string | RegExp | Array<string | RegExp>
  }
  /**
   * JS settings
   */
  js: {
    loader: `jsx` | `js`
    target: string
  }

  /**
   *TS settings
   */
  ts: {
    loader: `tsx` | `ts`
    target: string
    tsconfigRaw: Record<string, any>
  }
}

/**
 * `BudEsbuild` configures Bud to process JS and TS with esbuild-loader
 */
@label(`@roots/bud-esbuild`)
@expose(`esbuild`)
@options<Options>({
  minify: app => ({
    css: true,
    include: [
      app.hooks.filter(`pattern.css`),
      app.hooks.filter(`pattern.js`),
      app.hooks.filter(`pattern.ts`),
    ],
    exclude: app.hooks.filter(`pattern.modules`),
  }),
  js: () => ({
    loader: `jsx`,
    target: `es2015`,
  }),
  ts: ({context}) => ({
    loader: `tsx`,
    target: `es2015`,
    tsconfigRaw: context.config?.[`tsconfig.json`]?.module ?? null,
  }),
})
export default class BudEsbuild extends Extension<Options> {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    bud.hooks
      .on(`build.resolve.extensions`, ext => ext.add(`.ts`).add(`.tsx`))
      .build.setLoader(`esbuild`, await this.resolve(`esbuild-loader`))
      .setItem(`esbuild-js`, {
        loader: `esbuild`,
        options: () => this.options.js,
      })
      .setItem(`esbuild-ts`, {
        loader: `esbuild`,
        options: () => this.options.ts,
      })
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(_bud: Bud) {
    this.use()
  }

  /**
   * Use esbuild
   *
   * @remarks
   * This method is called automatically when the extension is booted.
   *
   * If you have multiple compilers installed you may need to call this manually.
   *
   * @example
   * ```js
   * bud.esbuild.use()
   * ```
   */
  @bind
  public use(): Bud[`esbuild`] {
    this.app.terser.enable(false)
    this.app.minimizeCss.enable(false)

    this.app.hooks
      .on(`build.optimization.minimizer`, minimizer => [
        new ESBuildMinifyPlugin(this.get(`minify`)),
      ])
      .build.setRule(`ts`, {
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
        use: [`esbuild-ts`],
      })
      .rules.js.setUse([`esbuild-js`])

    return this
  }
}
