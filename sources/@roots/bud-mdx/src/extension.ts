import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * MDX configuration
 */
@label(`@roots/bud-mdx`)
@dependsOnOptional([
  `@roots/bud-babel`,
  `@roots/bud-esbuild`,
  `@roots/bud-swc`,
  `@roots/bud-typescript`,
])
@options({
  remarkPlugins: {},
  rehypePlugins: {},
})
export class BudMDX extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    const loader = await this.resolve(`@mdx-js/loader`, import.meta.url)
    if (!loader) return this.logger.error(`MDX loader not found`)

    hooks.on(`build.resolve.extensions`, ext => ext.add(`.md`).add(`.mdx`))
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`@mdx-js/loader`]: loader,
    }))

    build.setLoader(`mdx`, `@mdx-js/loader`).setItem(`mdx`, {
      loader: `mdx`,
      options: () => ({
        rehypePlugins: this.get(`rehypePlugins`)
          ? Object.values(this.get(`rehypePlugins`))
          : [],
        remarkPlugins: this.get(`remarkPlugins`)
          ? Object.values(this.get(`remarkPlugins`))
          : [],
      }),
    })
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    bud.build.setRule(`mdx`, {
      test: /\.mdx?$/,
      include: [app => app.path(`@src`)],
      use: [...(bud.build.rules.js.use ?? []), `mdx`],
    })
  }

  /**
   * Remark plugins
   *
   * @deprecated Use {@link Extension.get} and {@link Extension.set instead}
   *
   * @example
   * ```js
   * bud.mdx.set(`remarkPlugins`, {})
   * ```
   */
  public get remarkPlugins(): Record<string, any> {
    return Object.values(this.get(`remarkPlugins`))
  }
  public set remarkPlugins(dictionary: Record<string, any>) {
    this.set(`remarkPlugins`, (plugins = {}) => ({
      ...plugins,
      ...dictionary,
    }))
  }

  /**
   * Rehype plugins
   *
   * @deprecated Use {@link Extension.get} and {@link Extension.set instead}
   *
   * @example
   * ```js
   * bud.mdx.set(`rehypePlugins`, {})
   * ```
   */
  public get rehypePlugins(): Record<string, any> {
    return Object.values(this.getOption(`rehypePlugins`))
  }
  public set rehypePlugins(dictionary: Record<string, any>) {
    this.setOption(`rehypePlugins`, {
      ...this.getOption(`rehypePlugins`),
      ...dictionary,
    })
  }
}
