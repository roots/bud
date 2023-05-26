import {join} from 'node:path'

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
@expose(`swc`)
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
  },
  minify: false,
})
export default class BudSWC extends Extension<Options> {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, context, fs, hooks}: Bud) {
    const loaderPath = await this.resolve(`swc-loader`, import.meta.url)

    if (context.files?.[`.swcrc`]?.path) {
      const cfg = fs.json.parse(
        await fs.read(context.files[`.swcrc`].path),
      )
      this.setOptions(cfg)
    }

    /** set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      'swc-loader': loaderPath,
    }))

    build.setLoader(`swc`, `swc-loader`).setItem(`swc`, {
      loader: `swc`,
      options: () => this.options,
    })

    hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions.add(`.ts`).add(`.tsx`).add(`.jsx`),
    )
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build, hooks}: Bud) {
    build
      .getRule(`js`)
      .setTest(/\.(j|t)sx?$/)
      .setUse(() => [`swc`])

    hooks.on(`build.resolve.extensions`, (extensions = new Set()) =>
      extensions
        .add(`.ts`)
        .add(`.jsx`)
        .add(`.tsx`)
        .add(`.mts`)
        .add(`.cts`),
    )
  }

  /**
   *{@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    this.set(
      `jsc.experimental.cacheRoot` as any,
      (cacheRoot: string) =>
        cacheRoot ?? join(bud.cache.cacheDirectory, `swc`),
    )
    bud.build.getItem(`swc`).setOptions(this.options)
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
