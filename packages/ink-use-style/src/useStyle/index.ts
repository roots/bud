import {ComponentState, useState, useEffect} from 'react'
import useSwr, {mutate} from 'swr'
import useStdoutDimensions from 'ink-use-stdout-dimensions'
import type {Styles, Theme, UseStyle} from '../typings'
import {defaultTheme} from '../themes'

/**
 * Use style.
 */
export const useStyle: UseStyle = (
  initialData = defaultTheme,
) => {
  /**
   * Theme values
   */
  const {data: theme} = useSwr('theme', {
    initialData,
    revalidateOnFocus: false,
    isOnline() {
      return true
    },
    isDocumentVisible() {
      return true
    },
  })

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
    mutate('theme', {
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
    mutate('theme', {
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
