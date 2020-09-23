import useStdOutDimensions from 'ink-use-stdout-dimensions'
import {useState, useEffect} from 'react'

export interface Styles {
  ctx: CallableFunction
  col: CallableFunction
  is: CallableFunction
  unit: number
  dimensions: {
    width: number
    height: number
  }
  screen: string
  colors: {
    primary: string
  }
}

export interface Palette {
  primary: string
}

export interface Theme {
  spacer: number
  palette: Palette
}

const defaultTheme: Theme = {
  spacer: 1,
  palette: {primary: '#6C758F'},
}

const useAppStyles: (themeProps?: Theme) => Styles = (
  themeProps = defaultTheme,
) => {
  const [width, height] = useStdOutDimensions()
  const [screen, setScreen] = useState('loading')
  const [unit, setUnit] = useState(null)
  const [theme] = useState(themeProps)

  useEffect(() => {
    if (width < 40) setScreen('sm')
    else if (width < 60) setScreen('md')
    else if (width < 80) setScreen('lg')
    else setScreen('xl')
  }, [width])

  useEffect(() => {
    width && setUnit(width / 12)
  }, [width])

  const col = count => {
    return count * unit - theme.spacer * 2
  }

  const ctx = ([sm, md = sm, lg = md, xl = lg]) => {
    switch (screen) {
      case 'sm':
        return sm
      case 'md':
        return md
      case 'lg':
        return lg
      case 'xl':
        return xl
    }
  }

  const is = (query, forTrue, forFalse) =>
    screen == query ? forTrue : forFalse

  const dimensions = {
    width: width - theme.spacer * 2,
    height: height - theme.spacer * 2,
  }

  return {
    col,
    unit,
    is,
    ctx,
    dimensions,
    screen,
    colors: theme.palette,
  }
}

export {useAppStyles as default}
