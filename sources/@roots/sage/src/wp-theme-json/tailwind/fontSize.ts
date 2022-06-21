import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'

export interface TailwindSize {
  [key: string]: [string, {lineHeight: string}] | string
}
export type WordPressSizes =
  WPThemeJson['settings']['typography']['fontSizes']

/**
 * Get font families from a tailwind config file
 *
 * @param path - path to tailwind.config.json
 * @returns config.theme.extends.fontSize
 */
export interface getFontSize {
  (path: string): Promise<
    Record<string, [string, {lineHeight: string}] | string>
  >
}

/**
 * Make a theme.json fonts.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transform {
  ([slug, value]: [string, string]): WordPressSizes[any]
}

/**
 * TailwindCSS fonts entry to WordPress fonts entries
 *
 * @returns
 */
export interface toWordPressEntries {
  ([entry, path]: [[string, TailwindSize], Array<string>]): WordPressSizes
}

/**
 * Transform tailwindcss fonts to wordpress theme.json fonts
 *
 * @param fonts - from tailwindcss
 *
 * @public
 */
export interface transformFonts {
  (fonts: TailwindSize): WordPressSizes
}

export const getFontSize: getFontSize = async (path: string) => {
  const tailwindImport = await import(path)
  const tailwind = tailwindImport?.default ?? tailwindImport

  return tailwind?.theme?.extend?.fontSize ?? {}
}

export const transformEntry: transform = ([slug, fontSize]: [
  string,
  string,
]) => ({name: slug, slug, size: fontSize})

export const transformFonts: transformFonts = (
  fonts: TailwindSize,
): WordPressSizes =>
  Object.entries(fonts ?? {})
    .map(([k, v]) => [k, Array.isArray(v) ? v.shift() : v])
    .map(transformEntry)
