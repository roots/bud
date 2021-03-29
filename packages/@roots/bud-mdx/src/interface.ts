import '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## mdx
     *
     * Configure mdx
     */
    mdx: Framework.Mdx
  }

  namespace Framework {
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

    namespace Hooks {
      namespace Loader {
        interface Base {
          mdx: Subject
        }
      }

      namespace Item {
        interface Base {
          mdx: Subject
          babel: Subject
        }
      }
    }
  }
}
