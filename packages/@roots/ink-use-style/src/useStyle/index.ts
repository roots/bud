import React from 'react'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

import type {Styles, Theme, UseStyle} from '../typings'
import {defaultTheme} from '../themes/index'

/**
 * Use style.
 */
export const useStyle: UseStyle = (
  initialData = defaultTheme,
) => {
  /**
   * Theme values
   */
  const [theme, setTheme] = React.useState<Theme>(initialData)

  /**
   * Width and height of terminal viewport.
   */
  const [width, height]: React.ComponentState =
    useStdoutDimensions()

  /**
   * Active screen size
   */
  const [screen, setScreen]: React.ComponentState =
    React.useState()

  /**
   * Width of one column.
   */
  const [unit, setUnit]: React.ComponentState =
    React.useState(null)

  /**
   * Width and height of application.
   */
  const [bounds, setBounds]: React.ComponentState =
    React.useState({
      width,
      height,
    })

  /**
   * Set application based on viewport size.
   */
  React.useEffect(() => {
    setBounds({
      width: width > theme.maxWidth ? theme.maxWidth : width,
      height:
        height > theme.maxHeight ? theme.maxHeight : height,
    })
  }, [width, height])

  /**
   * Set unit to be the total application width available
   * divided by the column count
   */
  React.useEffect(() => {
    setUnit(bounds.width / theme.columns)
  }, [bounds])

  /**
   * Determine which screen size is currently active.
   */
  React.useEffect(() => {
    theme.screens.forEach(([lower, upper], iteration) => {
      bounds.width > lower &&
        bounds.width < upper &&
        setScreen(iteration)
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
