import type {GlobalSettingsAndStyles as WPThemeJson} from '@roots/bud-preset-wordpress/theme'
import {isString} from 'lodash-es'

export type WordPressColors = WPThemeJson['settings']['color']['palette']

export interface TailwindColors {
  [key: string]: string | TailwindColors
}

/**
 * Get color palette from a tailwind config file
 *
 * @param path - path to tailwind.config.json
 * @returns config.theme.extend.colors
 *
 * @public
 */
export interface getPalette {
  (path: string): Promise<TailwindColors>
}
export const getPalette: getPalette = async (path: string) => {
  const tailwindImport = await import(path)
  const tailwind = tailwindImport?.default ?? tailwindImport

  return tailwind?.theme?.extend?.colors ?? {}
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
  (label: Array<string>): string
}
const name: name = label =>
  label
    .map(label => `${label.charAt(0).toUpperCase()}${label.slice(1)}`)
    .join(' ')

/**
 * Make a theme.json palette.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transform {
  (slug: Array<string>, color: string): WordPressColors[any]
}
export const transform: transform = (slug, color) => ({
  name: name(slug),
  slug: slug.join('-').toLowerCase(),
  color: color.toLowerCase(),
})

/**
 * TailwindCSS palette entry to WordPress palette entries
 *
 * @returns
 */
export interface toWordPressEntries {
  ([entry, path]: [
    [string, string | TailwindColors],
    Array<string>,
  ]): WordPressColors
}
export const toWordPressEntries: toWordPressEntries = ([entry, path]: [
  [string, string | TailwindColors],
  Array<string>,
]): WordPressColors => {
  const [name, value] = entry

  if (!isString(value)) {
    const result = Object.entries(value)
      .map(i => [i, [...path, name]])
      .flatMap(toWordPressEntries)

    return result
  }

  return [transform([...path, name], value)]
}

/**
 * Transform tailwindcss palette to wordpress theme.json palette
 *
 * @param palette - from tailwindcss
 *
 * @public
 */
export interface transformPalette {
  (palette: TailwindColors): WordPressColors
}
export const transformPalette: transformPalette = (
  palette: TailwindColors,
) =>
  Object.entries(palette ?? {})
    .map(i => [i, []])
    .flatMap(toWordPressEntries)
