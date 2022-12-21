import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@swc/core'

/**
 * Transpile JS and TS with `swc-loader`
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 */
@label(`@roots/bud-swc`)
@options<Options>({
  module: {type: `commonjs`},
  isModule: `unknown`,
  jsc: {
    experimental: {
      plugins: [],
    },
    parser: {
      syntax: `typescript`,
      tsx: true,
      decorators: false,
      dynamicImport: true,
    },
    transform: null,
    target: `es2019`,
    loose: false,
  },
  minify: false,
})
@expose(`swc`)
export default class BudSWC extends Extension<Options> {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud) {
    bud.hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.ts`).add(`.tsx`).add(`.jsx`),
    )
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async buildBefore?(bud: Bud) {
    await this.registerSWC(bud)
  }

  /**
   * Set SWC plugins
   *
   * @param plugins - Array of plugins or a function that returns an array of plugins
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public plugins(
    plugins:
      | Options['jsc']['experimental']['plugins']
      | ((
          plugins: Options['jsc']['experimental']['plugins'],
        ) => Options['jsc']['experimental']['plugins']),
  ) {
    const options = this.getOptions()

    const value =
      typeof plugins === `function`
        ? plugins(options?.jsc?.experimental?.plugins)
        : plugins

    this.setOption(`jsc`, {
      ...(options?.jsc ?? {}),
      experimental: {
        ...(options?.jsc?.experimental ?? {}),
        plugins: value,
      },
    })
  }

  /**
   * Register SWC with the build service
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registerSWC(bud: Bud) {
    const config = await bud.fs.exists(`.swcrc`)
    if (config === `file`) {
      this.setOptions(bud.fs.json.parse(await bud.fs.read(`.swcrc`)))
    }

    const options = this.getOptions()
    this.setOptions({
      ...options,
      jsc: {
        ...(options?.jsc ?? {}),
        experimental: {
          ...(options?.jsc?.experimental ?? {}),
          cacheRoot: bud.path(bud.cache.cacheDirectory, `swc`),
        },
        target: this.app.esm.enabled ? `es2022` : `es2019`,
      },
      module: {
        type: this.app.esm.enabled ? `es6` : `commonjs`,
      },
    })

    bud.build
      .setLoader(`swc`, `swc-loader`)
      .setItem(`swc`, {
        loader: `swc`,
        options: this.options,
      })
      .setRule(`ts`, {
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
        use: [`swc`],
      })
      .rules.js.setUse([`swc`])

    bud.build.rules = {
      ts: bud.build.rules.ts,
      ...bud.build.rules,
    }
  }
}
