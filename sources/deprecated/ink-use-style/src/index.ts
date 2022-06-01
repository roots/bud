// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * React hook for easy styling of Ink components.
 *
 * @packageDocumentation
 */

/**
 * Theme interface
 *
 * @public
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
