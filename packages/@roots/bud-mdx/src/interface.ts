import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## mdx
     *
     * Configure mdx to suit your application needs
     */
    mdx: Framework.Api.Mdx
  }

  namespace Framework.Api {
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
      setRemarkPlugin: Framework.Api.Mdx.SetRemarkPlugin

      /**
       * ## mdx.remarkPlugins
       *
       * Get registered remark plugins.
       */
      remarkPlugins: Framework.Api.Mdx.RemarkRegistry

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
      setRehypePlugin: Framework.Api.Mdx.SetRehypePlugin

      /**
       * ## mdx.rehypePlugins
       *
       * Get registered rehype plugins.
       */
      rehypePlugins: Framework.Api.Mdx.RehypeRegistry

      /**
       * ## mdx.options
       */
      options: Framework.Api.Mdx.Options
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
      type SetRemarkPlugin = (
        plugins: RemarkRegistry,
      ) => Framework.Api.Mdx
      type SetRehypePlugin = (
        plugins: RemarkRegistry,
      ) => Framework.Api.Mdx
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      mdx: any
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      mdx: any
      babel: any
    }
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-mdx': Module
    }
  }
}
