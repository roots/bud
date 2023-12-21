import type {Theme} from '@roots/bud-wordpress-theme-json'

export interface TailwindSize {
  [key: string]: string
}
export type WordPressSpacingSizes =
  Theme.SettingsAndStyles['settings']['spacing']['spacingSizes']

/**
 * Make a theme.json {@link Theme.SettingsAndStyles['settings']['spacing']['spacingSizes'] | settings.spacing.spacingSizes} item from a key/value pair
 *
 * @param slug - spacing slug
 * @param value - spacing value
 * @returns WordPress theme.json color
 */
export interface transformEntry {
  ([slug, value]: [string, string]): WordPressSpacingSizes[any]
}
export const transformEntry: transformEntry = ([slug, size]) => ({
  name: slug,
  size,
  slug,
})

/**
 * Transform tailwindcss spacing to wordpress theme.json spacing
 *
 * @param sizes - from tailwindcss
 */
export interface transform {
  (sizes: TailwindSize): undefined | WordPressSpacingSizes
}
export const transform: transform = sizes =>
  Object.entries(sizes)?.map(transformEntry) ?? undefined
