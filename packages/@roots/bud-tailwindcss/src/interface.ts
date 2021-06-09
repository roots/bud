import '@roots/bud-api'
import '@roots/bud-postcss'
import {Framework, Module} from '@roots/bud-framework'

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
  export interface Extension extends Module {
    name: string
    boot: (app: Framework) => void
    api: {tailwind: Configure}
  }

  export type Configure = (
    implementation: 'tailwindcss' | '@tailwindcss/jit',
    config?: Omit<Config, null> | string,
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

  type UserDef<T = UserDef<{[key: string]: UserDef<string>}>> =
    | T
    | Rule<T>
    | RuleSet<T>
    | ThemeFn<T>

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
