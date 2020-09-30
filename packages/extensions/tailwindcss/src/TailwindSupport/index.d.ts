import Bud from '@roots/bud-types'

export default TailwindSupport

/**
 * Bud extension: TailwindCSS
 *
 * @see https://github.com/roots/bud/tree/master/packages/extensions/tailwindcss/README.md
 */
declare type TailwindSupport = Bud.Plugin.Factory
export const config: (config: unknown) => Bud

declare namespace TailwindSupport {
  export type config = (config: unknown) => Bud
}
