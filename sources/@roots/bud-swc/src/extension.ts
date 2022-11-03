import type {Bud} from '@roots/bud-framework/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * Transpile JS and TS with `swc-loader`
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 */
@label(`@roots/bud-swc`)
@options({
  jsc: {
    parser: {
      syntax: `typescript`,
      jsx: true,
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
export default class BudSWC extends Extension {
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
  public async configAfter(bud: Bud) {
    await this.registerSWC(bud)
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
