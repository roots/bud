export type UseStyle = (themeProps?: Theme) => Styles

export interface Styles {
  spacing: number
  bounds: {
    width: number
    height: number
  }
  screen: number
  colors: {[key: string]: string}
  ctx: (screens: Array<any>) => any
  col: (count: number) => number
  setColors: (colors: Theme['colors']) => void
  setScreens: (screens: Theme['screens']) => void
}

export interface Theme {
  spacing: Theme.Spacing
  colors: Theme.Colors
  screens: ScreenTuple[]
  columns: number
  maxWidth: number
  maxHeight: number
}

export namespace Theme {
  export type Colors = {[index: string]: string}
  export type Spacing = number
}

export type ScreenTuple = [number, number]
