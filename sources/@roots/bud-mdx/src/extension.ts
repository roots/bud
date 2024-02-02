import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

interface Options {
  rehypePlugins: Record<string, unknown>
  remarkPlugins: Record<string, unknown>
}

/**
 * MDX configuration
 */
@label(`@roots/bud-mdx`)
@options<Options>({
  rehypePlugins: {},
  remarkPlugins: {},
})
class BudMDX extends Extension<Options> {
  /**
   * Get rehype plugins
   */
  public declare getRehypePlugins: () => Options[`rehypePlugins`]

  /**
   * Get remark plugins
   */
  public declare getRemarkPlugins: () => Options[`remarkPlugins`]

  /**
   * Rehype plugins
   */
  public declare rehypePlugins: Options[`rehypePlugins`]
  /**
   * Remark plugins
   */
  public declare remarkPlugins: Options[`remarkPlugins`]
  /**
   * Set rehype plugins
   */
  public declare setRehypePlugins: (
    plugins: Options[`rehypePlugins`],
  ) => this

  /**
   * Set remark plugins
   */
  public declare setRemarkPlugins: (
    plugins: Options[`remarkPlugins`],
  ) => this

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot({build}: Bud) {
    build.setRule(`mdx`, {
      include: [({path}) => path(`@src`)],
      test: /\.mdx?$/,
      use: [...(build.rules.js.use ?? []), `mdx`],
    })
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    const loader = await this.resolve(`@mdx-js/loader`, import.meta.url)
    if (!loader) return this.logger.error(`MDX loader not found`)

    hooks.on(`build.resolve.extensions`, (ext = new Set()) =>
      ext.add(`.md`).add(`.mdx`),
    )
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
}

export {BudMDX as default}
