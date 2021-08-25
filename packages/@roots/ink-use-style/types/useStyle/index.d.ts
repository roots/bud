import type {Theme} from '..'
/**
 * useStyle hook
 *
 * @returns {Styles}
 */
interface useStyle {
  (themeProps?: Theme): Styles
}
/**
 * Return value
 */
interface Styles {
  /**
   * Spacing value (total character width)
   */
  spacing: number
  /**
   * Maximum width and height of display area
   */
  bounds: {
    /**
     * Maximum width
     */
    width: number
    /**
     * Maximum height
     */
    height: number
  }
  screen: number
  colors: {
    [key: string]: string
  }
  ctx: (screens: Array<any>) => any
  col: (count: number) => number
  setColors: (colors: Theme['colors']) => void
  setScreens: (screens: Theme['screens']) => void
}
declare const useStyle: useStyle
export {useStyle}
export type {Styles}
//# sourceMappingURL=index.d.ts.map
