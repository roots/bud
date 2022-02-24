import {
  TailwindColorValue,
  TailwindValuesColor,
} from 'tailwindcss/tailwind-config'

import {WPThemeJson} from '.'

export type WordPressPalette = WPThemeJson['settings']['color']['palette']
export {TailwindColorValue, TailwindValuesColor}

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
 * Make a theme.json palette.color item from a slug and a color
 *
 * @param slug - color slug
 * @param value - color value
 * @returns WordPress theme.json color
 */
export interface transform {
  (slug: string, color: string): WordPressPalette[any]
}
export const transform: transform = (slug, color) => ({
  name: name(slug),
  slug,
  color,
})

/**
 * TailwindCSS palette to WordPress palette reducer
 *
 * @param acc - WordPress color palette array
 * @param param - tuple of tailwind key and color values
 *
 * @returns
 */
export interface toThemeArray {
  (
    acc: WordPressPalette,
    [key, value]: [string, TailwindColorValue | TailwindValuesColor],
  ): WordPressPalette
}
export const toThemeArray: toThemeArray = (palette, colorValue) => {
  const [color] = colorValue

  const normalizeKey = (key: string) =>
    key !== 'default' ? `${color}-${key}` : color

  const flatten: (
    color: string,
    shades: TailwindValuesColor | TailwindColorValue,
  ) => Array<[string, string]> = (color, shades) =>
    typeof shades !== 'string'
      ? Object.entries(shades).reduce((all, [variant, color]) => {
          return [...all, [normalizeKey(variant), color]]
        }, [])
      : [[color, shades]]

  return flatten(...colorValue).reduce(
    (palette, color) => [...palette, transform(...color)],
    palette,
  )
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
  (path: string): Promise<TailwindValuesColor>
}
export const getPalette = async (path: string) => {
  const tailwindImport = await import(path)
  const tailwind = tailwindImport?.default ?? tailwindImport

  return tailwind?.theme?.extend?.colors ?? {}
}

/**
 * Transform tailwindcss palette to wordpress theme.json palette
 *
 * @param palette - from tailwindcss
 *
 * @public
 */
export interface transformPalette {
  (palette: TailwindValuesColor): WordPressPalette
}
export const transformPalette: transformPalette = (
  palette: TailwindValuesColor,
) => {
  return Object.entries(palette ?? {}).reduce(toThemeArray, [])
}
