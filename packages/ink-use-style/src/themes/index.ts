export * as defaultTheme from './defaultTheme'

export interface Theme {
  spacing: Theme.Spacing
  colors: Theme.Colors
  screens: ScreenTuple[]
  columns: number
}
export namespace Theme {
  export type Colors = {[index: string]: string}
  export type Spacing = number
}

export type ScreenTuple = [number, number]
