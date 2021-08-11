import {ComponentState, useEffect, useState} from 'react'

import {defaultTheme} from '../themes/index'
import type {Styles, Theme, UseStyle} from '../typings'

const useStdoutDimensions = require('ink-use-stdout-dimensions')

const useStyle: UseStyle = (initialData = defaultTheme) => {
  /**
   * Theme values
   */
  const [theme, setTheme] = useState<Theme>(initialData)

  /**
   * Width and height of terminal viewport.
   */
  const [width, height]: ComponentState = useStdoutDimensions()

  /**
   * Active screen size
   */
  const [screen, setScreen]: ComponentState = useState()

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

  /**
   * Set application based on viewport size.
   */
  useEffect(() => {
    setBounds({
      width: width > theme.maxWidth ? theme.maxWidth : width,
      height:
        height > theme.maxHeight ? theme.maxHeight : height,
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

/**
 * @exports useStyle
 */
export {useStyle}
