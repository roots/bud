import type {Bud} from '@roots/bud-framework/bud'
import {Extension} from '@roots/bud-framework/extension'
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
    target: `es5`,
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
  public async register(bud: Bud) {
    bud.hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.ts`).add(`.tsx`).add(`.jsx`),
    )
  }

  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async buildBefore(bud: Bud) {
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
    if (typeof plugins === `function`) {
      this.options.jsc.experimental.plugins = plugins(
        this.options.jsc.experimental.plugins,
      )
    } else {
      this.options.jsc.experimental.plugins = plugins
    }
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
      this.setOptions(
        bud.fs.json.parse(await bud.fs.read(`.swcrc`, `utf8`)),
      )
    }

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
  }
}
