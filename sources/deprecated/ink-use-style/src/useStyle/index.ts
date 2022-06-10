import useStdoutDimensions from 'ink-use-stdout-dimensions'
import type {ComponentState} from 'react'
import {useEffect, useState} from 'react'

import type {Theme} from '..'
import {defaultTheme} from '../themes'

/**
 * useStyle hook
 *
 * @public
 */
export interface useStyle {
  (themeProps?: Theme): Styles
}

/**
 * Object returned by hook
 *
 * @public
 */
export interface Styles {
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
  colors: {[key: string]: string}
  ctx: (screens: Array<any>) => any
  col: (count: number) => number
  setColors: (colors: Theme['colors']) => void
  setScreens: (screens: Theme['screens']) => void
}

/**
 * useStyle hook
 *
 */
export const useStyle: useStyle = (initialData = defaultTheme) => {
  /**
   * Theme values
   */
  const [theme, setTheme] = useState<Theme>(initialData)

  /**
   * Width and height of terminal viewport.
   */
  const [stdoutWidth, stdoutHeight]: ComponentState = useStdoutDimensions()
  const [width, setWidth]: ComponentState = useState(null)
  const [height, setHeight]: ComponentState = useState(null)

  /**
   * Active screen size
   */
  const [screen, setScreen]: ComponentState = useState(null)

  /**
   * Width of one column.
   */
  const [unit, setUnit]: ComponentState = useState(null)

  /**
   * Width and height of application.
   */
  const [bounds, setBounds]: ComponentState = useState({
    width,
    height,
  })

  useEffect(() => {
    typeof stdoutWidth === 'number' &&
      setWidth(stdoutWidth > 0 ? stdoutWidth : 70)

    typeof stdoutHeight === 'number' &&
      setHeight(stdoutHeight > 0 ? stdoutHeight : 25)
  }, [stdoutWidth, stdoutHeight])

  /**
   * Set application based on viewport size.
   */
  useEffect(() => {
    setBounds({
      width: width > theme.maxWidth ? theme.maxWidth : width,
      height: height > theme.maxHeight ? theme.maxHeight : height,
    })
  }, [width, height, theme.maxHeight, theme.maxWidth])

  /**
   * Set unit to be the total application width available
   * divided by the column count
   */
  useEffect(() => {
    setUnit(bounds.width / theme.columns)
  }, [bounds.width, theme.columns])

  /**
   * Determine which screen size is currently active.
   */
  useEffect(() => {
    theme.screens.forEach(([lower, upper], iteration) => {
      bounds.width > lower && bounds.width < upper && setScreen(iteration)
    })
  }, [bounds, theme])

  /**
   * Col
   * Function that returns the width for x columns
   */
  const col = (count: number): number => {
    return unit * count
  }

  /**
   * ctx
   *
   * Function that takes an array of possible display values
   * and returns the one that matches the current screen size.
   */
  const ctx: Styles['ctx'] = (screens): any => {
    const value = screens[screen] ?? screens[screens.length - 1]
    return typeof value == 'number' ? Math.floor(value) : value
  }

  /**
   * Set colors
   *
   * Merges colors onto theme.
   */
  const setColors = (colors: Theme['colors']) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        ...colors,
      },
    })
  }

  /**
   * Set screens
   *
   * Merges colors onto theme.
   */
  const setScreens = (screens: Theme['screens']) => {
    setTheme({
      ...theme,
      screens: [...theme.screens, ...screens],
    })
  }

  return {
    col,
    bounds,
    screen,
    ...theme,
    setColors,
    setScreens,
    ctx,
  }
}
