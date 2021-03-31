import '@roots/bud-framework'
import {RuleSetLoader, RuleSetUseItem} from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## mdx
     *
     * Configure mdx to suit your application needs
     */
    mdx: Mdx
  }

  /**
   * app.mdx config
   */
  interface Mdx {
    /**
     * ## mdx.setRemarkPlugin
     *
     * Add a remark plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.mdx.setRemarkPlugin({emoji})
     * ```
     */
    setRemarkPlugin: Mdx.SetRemarkPlugin

    /**
     * ## mdx.remarkPlugins
     *
     * Get registered remark plugins.
     */
    remarkPlugins: Mdx.RemarkRegistry

    /**
     * ## mdx.setRehypePlugin
     *
     * Add a rehype plugin.
     *
     * ### Usage
     *
     * ```js
     * bud.mdx.setRehypePlugin({emoji})
     * ```
     */
    setRehypePlugin: Mdx.SetRehypePlugin

    /**
     * ## mdx.rehypePlugins
     *
     * Get registered rehype plugins.
     */
    rehypePlugins: Mdx.RehypeRegistry

    /**
     * ## mdx.options
     */
    options: Mdx.Options
  }

  namespace Mdx {
    interface RemarkRegistry {
      [key: string]: RemarkPlugin
    }

    interface RehypeRegistry {
      [key: string]: RehypePlugin
    }
    interface Options {
      rehypePlugins: RehypePlugin[]
      remarkPlugins: RemarkPlugin[]
    }

    type RemarkPlugin = any
    type RehypePlugin = any
    type SetRemarkPlugin = (plugins: RemarkRegistry) => Mdx
    type SetRehypePlugin = (plugins: RemarkRegistry) => Mdx
  }

  namespace Hooks.Loader {
    interface Definitions {
      mdx: string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      mdx: RuleSetLoader
      babel: RuleSetLoader
    }
  }

  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-mdx': RuleSetUseItem
    }
  }
}
