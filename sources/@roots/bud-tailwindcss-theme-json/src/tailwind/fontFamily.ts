import type {Theme} from '@roots/bud-wordpress-theme-json'

export interface TailwindFontFamily {
  [key: string]: Array<string> | string
}
export type WordPressFonts =
  Theme.GlobalSettingsAndStyles['settings']['typography']['fontFamilies']

/**
 * Make a color name from a color label
 *
 * @param label - color label
 * @returns string
 */
interface name {
  (label: string): string
}
const name: name = label =>
  `${label.charAt(0).toUpperCase()}${label.slice(1)}`

/**
 * Make a theme.json fonts.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transformEntry {
  ([slug, value]: [string, string]): WordPressFonts[any]
}
export const transformEntry: transformEntry = ([slug, fontFamily]) => ({
  name: name(fontFamily.split(`,`).shift()),
  slug,
  fontFamily,
})

/**
 * Transform tailwindcss fonts to wordpress theme.json fonts
 *
 * @param fonts - from tailwindcss
 */
export interface transform {
  (fonts: TailwindFontFamily): WordPressFonts
}
export const transform: transform = fonts =>
  Object.entries(fonts)
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(`,`) : v])
    .map(transformEntry)
