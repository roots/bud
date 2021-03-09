import {render} from 'ink'
import {Instance, Service} from './'

interface Dashboard extends Service {
  /**
   * Service ident
   */
  name: any

  dashboard: Instance

  /**
   * Register service
   */
  register(): void
  /**
   * Mount CLI
   */
  run(): void

  /**
   * Unmount CLI
   */
  kill(): void

  /**
   * Mount CLI
   */
  run(): void

  /**
   * Unmount CLI
   */
  kill(): void

  /**
   * Redner
   */
  render: typeof render
}

interface Error {
  (body?: string, title?: string): void
}

export interface Theme {
  spacing: Theme.Spacing
  colors: Theme.Colors
  screens: Theme.ScreenTuple[]
  columns: number
}

export namespace Theme {
  export type Colors = {
    foreground: string
    faded: string
    primary: string
    primaryAlt: string
    error: string
    errorAl: string
    warning: string
    success: string
    accent: string
    flavor: string
  }
  export type Spacing = number

  export interface Styles {
    spacing: number
    bounds: {
      width: number
      height: number
    }
    screen: number
    colors: {
      foreground: string
      faded: string
      primary: string
      primaryAlt: string
      error: string
      errorAl: string
      warning: string
      success: string
      accent: string
      flavor: string
    }
    ctx: (screens: Array<any>) => any
    col: (count: number) => number
    setColors: (colors: Theme['colors']) => void
    setScreens: (screens: Theme['screens']) => void
  }

  export type ScreenTuple = [number, number]
}

export namespace Framework {
  namespace Dashboard {
    export type {Instance}
  }
}
