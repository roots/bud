import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * MDX2 support for `@roots/bud`
 */
@label(`@roots/bud-mdx`)
@dependsOn([`@roots/bud-babel`, `@roots/bud-react`])
@options({
  remarkPlugins: {},
  rehypePlugins: {},
})
export class BudMDX extends Extension {
  /**
   * Get registered remark plugins.
   */
  public get remarkPlugins(): Record<string, any> {
    return Object.values(this.getOption(`remarkPlugins`))
  }
  public set remarkPlugins(dictionary: Record<string, any>) {
    this.setOption(`remarkPlugins`, {
      ...this.getOption(`remarkPlugins`),
      ...dictionary,
    })
  }

  /**
   * Get registered rehype plugins.
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

  /**
   * `boot` callback
   */
  @bind
  public override async configAfter(bud: Bud) {
    bud.hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.md`).add(`.mdx`),
    )

    const loader = await this.resolve(`@mdx-js/loader`)

    bud.build
      .setLoader(`mdx`, loader)
      .setItem(`mdx`, {
        loader: `mdx`,
        options: () => ({
          rehypePlugins: this.rehypePlugins,
          remarkPlugins: this.remarkPlugins,
        }),
      })
      .setRule(`mdx`, {
        test: /\.mdx?$/,
        include: [app => app.path(`@src`)],
        use: [`babel`, `mdx`],
      })
  }
}
