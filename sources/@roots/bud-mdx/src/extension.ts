import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOnOptional,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

interface Options {
  remarkPlugins: Record<string, unknown>
  rehypePlugins: Record<string, unknown>
}

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
@options<Options>({
  remarkPlugins: {},
  rehypePlugins: {},
})
export class BudMDX extends Extension<Options> {
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
      include: [({path}) => path(`@src`)],
      use: [...(bud.build.rules.js.use ?? []), `mdx`],
    })
  }

  /**
   * Remark plugins
   */
  public declare remarkPlugins: Options[`remarkPlugins`]
  /**
   * Set remark plugins
   */
  public declare setRemarkPlugins: (
    plugins: Options[`remarkPlugins`],
  ) => this
  /**
   * Get remark plugins
   */
  public declare getRemarkPlugins: () => Options[`remarkPlugins`]

  /**
   * Rehype plugins
   */
  public declare rehypePlugins: Options[`rehypePlugins`]
  /**
   * Set rehype plugins
   */
  public declare setRehypePlugins: (
    plugins: Options[`rehypePlugins`],
  ) => this
  /**
   * Get rehype plugins
   */
  public declare getRehypePlugins: () => Options[`rehypePlugins`]
}
