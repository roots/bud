/**
 * React hook for use with the ink cli library
 *
 * @packageDocumentation
 */

export interface Theme {
  spacing: Theme.Spacing
  colors: Theme.Colors
  screens: Theme.ScreenTuple[]
  columns: number
  maxWidth: number
  maxHeight: number
}

export namespace Theme {
  export type Colors = {[index: string]: string}
  export type Spacing = number
  export type ScreenTuple = [number, number]
}

export {useStyle} from './useStyle/index'
export type {Styles} from './useStyle/index'

export {defaultTheme} from './themes'
