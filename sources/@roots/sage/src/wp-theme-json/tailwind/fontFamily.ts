import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'

export interface TailwindFonts {
  [key: string]: Array<string> | string
}
export type WordPressFonts =
  WPThemeJson['settings']['typography']['fontFamilies']

/**
 * Get font families from a tailwind config file
 *
 * @param path - path to tailwind.config.json
 * @returns config.theme.extends.fontFamily
 */
export interface getFonts {
  (path: string): Promise<Record<string, Array<string>>>
}

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

/**
 * Make a theme.json fonts.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transform {
  ([slug, value]: [string, string]): WordPressFonts[any]
}

/**
 * TailwindCSS fonts entry to WordPress fonts entries
 *
 * @returns
 */
export interface toWordPressEntries {
  ([entry, path]: [
    [string, string | TailwindFonts],
    Array<string>,
  ]): WordPressFonts
}

/**
 * Transform tailwindcss fonts to wordpress theme.json fonts
 *
 * @param fonts - from tailwindcss
 *
 * @public
 */
export interface transformFonts {
  (fonts: TailwindFonts): WordPressFonts
}

export const getFonts: getFonts = async (path: string) => {
  const tailwindImport = await import(path)
  const tailwind = tailwindImport?.default ?? tailwindImport

  return tailwind?.theme?.extend?.fontFamily ?? {}
}

const name: name = label =>
  `${label.charAt(0).toUpperCase()}${label.slice(1)}`

export const transform: transform = ([slug, fontFamily]: [
  string,
  string,
]) => ({name: fontFamily.split(',').shift(), slug, fontFamily})

export const transformFonts: transformFonts = (fonts: TailwindFonts) =>
  Object.entries(fonts ?? {})
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(' ') : v])
    .map(transform)
