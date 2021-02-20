import '@roots/bud'
import '@roots/bud-postcss'

declare module '@roots/bud' {
  interface Bud {
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
    tailwind: Bud.Tailwind.Configure
  }

  namespace Bud.Tailwind {
    export type Configure = (
      this: Bud,
      params: Omit<Tailwind.Config, null>,
    ) => Bud

    export interface Config {
      purge?: string[]
      target?: string
      prefix?: string
      important?: boolean
      separator?: string
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
