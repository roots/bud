export interface Styles {
  unit: number
  dimensions: {
    width: number
    height: number
  }
  screen: string
  colors: {
    primary: string
  }
  ctx: CallableFunction
  col: CallableFunction
  is: CallableFunction
  size: (query: unknown) => boolean
}
export interface Palette {
  primary: string
}
export interface Theme {
  spacer: number
  palette: Palette
}
declare const useAppStyles: (themeProps?: Theme) => Styles
export {useAppStyles as default}
//# sourceMappingURL=useAppStyles.d.ts.map
