import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

/**
 * Esbuild options
 *
 * @public
 */
export interface Options {
  /**
   * Minify settings
   * @public
   */
  minify: {
    /**
     * Esbuild should minify CSS
     * @public
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
    loader: 'jsx' | 'jsx'
    target: string
  }
  /**
   *TS settings
   */
  ts: {
    loader: 'tsx' | 'ts'
    target: string
    tsconfigRaw: Record<string, any>
  }
}

/**
 * `BudEsbuild` configures Bud to process JS and TS with esbuild-loader
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 */
@label(`@roots/bud-esbuild`)
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
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const loader = await this.resolve(`esbuild-loader`)

    this.app.build
      .setLoader(`esbuild`, loader)
      .setItem(`esbuild-js`, {
        loader: `esbuild`,
        options: () => this.options.js,
      })
      .setItem(`esbuild-ts`, {
        loader: `esbuild`,
        options: () => this.options.ts,
      })
      .setRule(`ts`, {
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
        use: [`esbuild-ts`],
      })
      .rules.js.setUse([`esbuild-js`])

    this.app.hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.ts`).add(`.tsx`),
    )
  }

  /**
   * `buildBefore` callback
   *
   * @remarks
   *
   * @public
   */
  @bind
  public async buildBefore() {
    this.app.hooks.on(`build.optimization.minimizer`, () => [
      new ESBuildMinifyPlugin(this.options.minify),
    ])
  }
}
