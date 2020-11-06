// Type definitions for tailwindcss v1.9.6
// Project: tailwindcss
// Definitions by: Kelly Mears <https://kellymears.me>
export as namespace tailwindcss

export function tailwindcss(params: tailwindcss.Config): any

export type Config =
  | PathToConfig
  | ThemeObject
  | UsingConfigKey<PathToConfig>
  | UsingConfigKey<ThemeObject>
  | null

export type PathToConfig = string

export type UsingConfigKey<Type> = {
  config: Type
}

export interface ThemeObject {
  theme?: {[key: string]: any}
  variants?: {[key: string]: any}
}
