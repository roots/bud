import useStdOutDimensions from 'ink-use-stdout-dimensions'
import {ComponentState, useState, useEffect} from 'react'
import {defaultTheme} from '../themes'
import type {Theme} from '../themes'

export const useStyle: UseStyle = (
  themeProps = defaultTheme,
) => {
  /**
   * Theme values
   */
  const [theme, setTheme]: ComponentState = useState<Theme>(
    themeProps,
  )

  /**
   * Width and height of terminal viewport.
   */
  const [width, height]: ComponentState = useStdOutDimensions()

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
    width: width - theme.spacing * 2,
    height: height - theme.spacing * 2,
  })

  /**
   * Set application based on viewport size.
   * Applies spacer padding to all four sides of viewport.
   */
  useEffect(() => {
    setBounds({
      width: width - theme.spacing * 2,
      height: height - theme.spacing * 2,
    })
  }, [width, height])

  /**
   * Set unit to be the total application width available
   * divided by the column count
   */
  useEffect(() => {
    setUnit(bounds.width / theme.columns)
  }, [bounds])

  /**
   * Determine which screen size is currently active.
   */
  useEffect(() => {
    theme.screens.map(([lower, upper], iteration) => {
      bounds.width > lower &&
        bounds.width < upper &&
        setScreen(iteration)
    })
  }, [bounds, theme])

  /**
   * Col
   *
   * Function that returns the width for x columns
   */
  const col = (count: number): number => {
    return unit * count
  }

  /**
   * Ctx
   *
   * Function that takes an array of possible display values
   * and returns the one that matches the current screen size.
   */
  const ctx: Styles['ctx'] = (screens): any => {
    const value = screens[screen] ?? screens[screens.length - 1]
    return typeof value == 'number' ? Math.floor(value) : value
  }

  /**
   * Is
   *
   * Sugary conditional helper.
   */
  const is: Styles['is'] = (testCase, trueCase, falseCase) =>
    testCase ? trueCase : falseCase

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
    is,
    ctx,
  }
}

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

export type UseStyle = (themeProps?: Theme) => Styles
