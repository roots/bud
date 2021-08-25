import {Item, Loader} from '@roots/bud-build'
import {Module} from '@roots/bud-framework'
declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure mdx to suit your application needs
     */
    mdx: Framework.Api.Mdx
  }
  namespace Framework.Api {
    interface Mdx {
      /**
       * Get registered remark plugins.
       */
      remarkPlugins: Framework.Api.Mdx.RemarkRegistry
      /**
       * Get registered rehype plugins.
       */
      rehypePlugins: Framework.Api.Mdx.RehypeRegistry
      /**
       * Set MDX options
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
    }
  }
  namespace Framework {
    interface Loaders {
      mdx: Loader
    }
    interface Items {
      mdx: Item
      babel: Item
    }
    interface Extensions {
      '@roots/bud-mdx': Module
    }
  }
}
//# sourceMappingURL=interface.d.ts.map
