import '@roots/bud-postcss'
import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-tailwindcss': Module
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
    tailwind: Tailwind.Configure
  }

  namespace Tailwind {
    export type Configure = (
      config: Omit<Tailwind.Config, null>,
      implementation: 'tailwindcss' | '@tailwindcss/jit',
    ) => Framework

    export interface Config {
      purge?: string[]
      target?: string
      prefix?: 'tw' | string
      important?: false | boolean
      separator?: '-' | string
      presets?: string[]
      theme?: {
        [key: string]: UserDef
      }
      variants?: {
        [key: string]: Variant[]
      }
      corePlugins?: {}
      plugins?: []
    }

    export type UserDef<
      T = UserDef<{[key: string]: UserDef<string>}>
    > = T | Rule<T> | RuleSet<T> | ThemeFn<T>

    export interface RuleSet<T> {
      [key: string]: UserDef<Rule<T>>
    }

    export type Rule<T> =
      | string
      | string[]
      | boolean
      | ThemeFn<T>
      | RuleSet<T>
      | T

    export type ThemeFn<T = {[key: string]: UserDef<string>}> = (
      key: string,
      selection: string,
    ) => UserDef<T>

    export type Variant = 'responsive' | 'hover' | 'focus'
  }
}
