import useStdOutDimensions from 'ink-use-stdout-dimensions'
import {useState, useEffect} from 'react'

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
}

export interface Theme {
  spacing: number
  palette: {[key: string]: string}
  screens: Array<[number, number]>
  columns: number
}

export const useAppStyles: (themeProps?: Theme) => Styles = (
  themeProps = {
    spacing: 1,
    palette: {
      primary: '#545DD7',
      error: '#dc3545',
      warning: '#fd7e14',
      faded: '#6C758F',
    },
    screens: [
      [0, 40],
      [41, 60],
      [61, 80],
      [81, Infinity],
    ],
    columns: 12,
  },
) => {
  const [theme] = useState(themeProps)
  const [width, height] = useStdOutDimensions()
  const [screen, setScreen] = useState(null)
  const [unit, setUnit] = useState(null)
  const [bounds, setBounds]: React.ComponentState = useState({
    width: width - theme.spacing * 2,
    height: height - theme.spacing * 2,
  })

  useEffect(() => {
    setBounds({
      width: width - theme.spacing * 2,
      height: height - theme.spacing * 2,
    })
  }, [width, height])

  useEffect(() => {
    setUnit(bounds.width / theme.columns)
  }, [bounds])

  useEffect(() => {
    theme.screens.map(([lower, upper], iteration) => {
      bounds.width > lower &&
        bounds.width < upper &&
        setScreen(iteration)
    })
  }, [bounds])

  const col = (count: number): number => {
    return unit * count
  }

  const ctx: Styles['ctx'] = (screens): any => {
    const value = screens[screen] ?? screens[screens.length - 1]
    return typeof value == 'number' ? Math.floor(value) : value
  }

  const is: Styles['is'] = (testCase, trueCase, falseCase) =>
    testCase ? trueCase : falseCase

  return {
    col,
    is,
    ctx,
    bounds,
    screen,
    colors: theme.palette,
    spacing: theme.spacing,
  }
}

export {useAppStyles as default}
