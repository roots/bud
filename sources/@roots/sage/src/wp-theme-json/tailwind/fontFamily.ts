import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'

export interface TailwindFonts {
  [key: string]: Array<string>
}
export type WordPressFonts =
  WPThemeJson['settings']['typography']['fontFamilies']

/**
 * Make a color name from a color label
 *
 * @param label - color label
 * @returns string
 *
 * @public
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
export const transformEntry: transformEntry = ([slug, fontFamily]: [
  string,
  string,
]) => ({name: fontFamily.split(`,`).shift(), slug, fontFamily})

/**
 * Transform tailwindcss fonts to wordpress theme.json fonts
 *
 * @param fonts - from tailwindcss
 *
 * @public
 */
export interface transform {
  (fonts: TailwindFonts): WordPressFonts
}
export const transform: transform = (fonts: TailwindFonts) =>
  Object.entries(fonts ?? {})
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(`,`) : v])
    .map(transformEntry)
