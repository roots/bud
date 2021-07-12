import '@roots/bud-api'
import '@roots/bud-postcss'
import type {Framework, Module} from '@roots/bud-framework'
import type {TailwindConfig} from 'tailwindcss/tailwind-config'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-tailwindcss': Tailwind.Extension
    }
  }

  interface Framework {
    /**
     * ## bud.tailwindcss
     *
     * Configure tailwindcss.
     *
     * ### Usage
     *
     * ```js
     * bud.tailwindcss({
     *   theme: {
     *     // etc
     *   }
     * })
     */
    tailwind?: Tailwind.Configure
  }
}

export declare namespace Tailwind {
  interface Extension extends Module {
    name: string
    boot: (app: Framework) => void
    api: {tailwind: Configure}
  }

  type Configure = (
    this: Framework,
    config?: TailwindConfig,
  ) => Framework
}
