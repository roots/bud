import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-support/value'
import {EsbuildPlugin} from 'esbuild-loader'

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
    tsconfig: string
  }
}

/**
 * `BudEsbuild` configures Bud to process JS and TS with esbuild-loader
 */
@label(`@roots/bud-esbuild`)
@expose(`esbuild`)
@options({
  minify: Value.make(app => ({
    css: true,
    include: [
      app.hooks.filter(`pattern.css`),
      app.hooks.filter(`pattern.js`),
      app.hooks.filter(`pattern.ts`),
    ],
    exclude: app.hooks.filter(`pattern.modules`),
  })),
  js: Value.make(() => ({
    loader: `jsx`,
    target: `es2015`,
  })),
  ts: Value.make(({context}) => ({
    loader: `tsx`,
    target: `es2015`,
    tsconfig: context.files?.[`tsconfig.json`]?.path ?? null,
  })),
})
export default class BudEsbuild extends Extension<Options> {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    const loader = await this.resolve(`esbuild-loader`, import.meta.url)
    if (!loader) return this.logger.error(`Esbuild loader not found`)

    hooks.on(`build.resolve.extensions`, ext => ext.add(`.ts`).add(`.tsx`))
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`esbuild-loader`]: loader,
    }))

    build.setLoader(`esbuild`, `esbuild-loader`)

    build.setItem(`esbuild-js`, {
      loader: `esbuild`,
      options: () => this.get(`js`),
    })

    build.setItem(`esbuild-ts`, {
      loader: `esbuild`,
      options: () => this.get(`ts`),
    })

    build.getRule(`js`).setUse(items => [...items, `esbuild-js`])
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
    this.app.minify.js.enable(false)
    this.app.minify.css.enable(false)

    this.app.hooks
      .on(`build.optimization.minimizer`, minimizer => [
        new EsbuildPlugin(this.get(`minify`)),
      ])
      .build.setRule(`ts`, {
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
        resolve: {
          fullySpecified: false,
        },
        use: [`esbuild-ts`],
      })
      .rules.js.setUse([`esbuild-js`])

    this.app.hooks.on(
      `build.resolve.extensions`,
      (extensions = new Set()) =>
        extensions
          .add(`.ts`)
          .add(`.jsx`)
          .add(`.tsx`)
          .add(`.mts`)
          .add(`.cts`),
    )

    return this
  }
}
