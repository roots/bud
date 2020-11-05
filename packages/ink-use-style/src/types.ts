export interface Styles {
  spacing: number
  bounds: {
    width: number
    height: number
  }
  screen: number
  colors: {[key: string]: string}
  ctx: (screens: Array<string | number>) => any
  col: (count: number) => number
  is: (testCase: boolean, trueCase: any, falseCase: any) => any
  setColors: (colors: Theme['colors']) => void
  setScreens: (screens: Theme['screens']) => void
}

export type ScreenTuple = [number, number]

export interface Theme {
  spacing: Styles['spacing']
  colors: Styles['colors']
  screens: ScreenTuple[]
  columns: number
}

export type UseStyle = (themeProps?: Theme) => Styles
