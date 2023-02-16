import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@swc/core'

/**
 * SWC extension
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
      decorators: true,
      dynamicImport: true,
    },
    loose: false,
  },
  minify: false,
})
@expose(`swc`)
export default class BudSWC extends Extension<Options> {
  /**
   * `register` callback
   */
  @bind
  public override async register(bud: Bud) {
    const config = await bud.fs.exists(`.swcrc`)
    if (config === `file`) {
      this.setOptions(bud.fs.json.parse(await bud.fs.read(`.swcrc`)))
    }

    bud.build
      .setLoader(`swc`, await this.resolve(`swc-loader`))
      .setItem(`swc`, {
        loader: bud.build.getLoader(`swc`),
        options: ({swc}) => swc.options,
      })
      .setRule(`ts`, {
        test: ({hooks}) => hooks.filter(`pattern.ts`),
        include: [({path}) => path(`@src`)],
        use: [`swc`],
      })

    bud.build.getRule(`js`)?.setUse(() => [`swc`])

    bud.hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.ts`).add(`.tsx`).add(`.jsx`),
    )
  }

  /**
   * `buildBefore` callback
   */
  @bind
  public override async buildBefore?(bud: Bud) {
    this.set(
      `jsc.experimental.cacheRoot` as any,
      cacheRoot => cacheRoot ?? bud.path(bud.cache.cacheDirectory, `swc`),
    )
  }

  /**
   * Set SWC plugins
   */
  @bind
  public plugins(
    plugins:
      | Options['jsc']['experimental']['plugins']
      | ((
          plugins: Options['jsc']['experimental']['plugins'],
        ) => Options['jsc']['experimental']['plugins']),
  ) {
    const value =
      typeof plugins === `function`
        ? plugins(this.options?.jsc?.experimental?.plugins)
        : plugins

    this.set(`jsc.experimental.plugins` as any, value)
  }
}
