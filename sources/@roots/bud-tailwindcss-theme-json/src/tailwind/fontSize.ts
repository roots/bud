import type {Theme} from '@roots/bud-wordpress-theme-json'

export interface TailwindSize {
  [key: string]:
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string
          letterSpacing: string
          fontWeight: string | number
        }>,
      ]
}
export type WordPressSizes =
  Theme.GlobalSettingsAndStyles['settings']['typography']['fontSizes']

/**
 * Make a theme.json fonts.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transformEntry {
  ([slug, value]: [string, string]): WordPressSizes[any]
}
export const transformEntry: transformEntry = ([slug, fontSize]) => ({
  name: slug,
  slug,
  size: fontSize,
})

/**
 * Transform tailwindcss fonts to wordpress theme.json fonts
 *
 * @param fonts - from tailwindcss
 */
export interface transform {
  (fonts: TailwindSize): WordPressSizes
}
export const transform: transform = fonts =>
  Object.entries(fonts)
    .map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    .map(transformEntry)
