import isString from '@roots/bud-support/lodash/isString'
import type {Theme} from '@roots/bud-wordpress-theme-json'

export type WordPressColors =
  Theme.GlobalSettingsAndStyles['settings']['color']['palette']

export interface TailwindColors {
  [key: string]: string | TailwindColors
}

/**
 * Make a color name from a color label
 *
 * @param label - color label
 * @returns string
 */
interface name {
  (label: Array<string>): string
}
const name: name = label =>
  label
    .map(label => `${label.charAt(0).toUpperCase()}${label.slice(1)}`)
    .join(` `)

/**
 * Make a theme.json palette.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transformEntry {
  (slug: Array<string>, color: string): WordPressColors[any]
}
export const transformEntry: transformEntry = (slug, color) => ({
  name: name(slug),
  slug: slug.join(`-`).toLowerCase(),
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
export const toWordPressEntries: toWordPressEntries = ([entry, path]) => {
  const [name, value] = entry

  if (!isString(value)) {
    const result = Object.entries(value)
      .map(i => [i, [...path, name]])
      .flatMap(toWordPressEntries)

    return result
  }

  return [transformEntry([...path, name], value)]
}

/**
 * Transform tailwindcss palette to wordpress theme.json palette
 *
 * @param palette - from tailwindcss
 */
export interface transform {
  (palette: TailwindColors): WordPressColors
}
export const transform: transform = palette =>
  Object.entries(palette)
    .map(i => [i, []])
    .flatMap(toWordPressEntries)
