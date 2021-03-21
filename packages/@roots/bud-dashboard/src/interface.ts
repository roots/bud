import {Framework} from '@roots/bud-framework'
import {Compiler} from '@roots/bud-typings'
import {Styles} from '@roots/ink-use-style'

export namespace Dashboard {
  export interface Props {
    bud: Framework
  }

  export interface AppProps {
    bud: Framework
    pkg: {[key: string]: any}
    screens?: Array<[number, number]>
    theme: Styles
    stats: Compiler.Stats.Output['json']
    progress: {
      percentage: string
      decimal: number
      message: string
    }
    errors: string[]
    hasErrors: boolean
    warnings: string[]
    hasWarnings: boolean
  }

  export interface Asset {
    chunks: Array<number | string>
    chunkNames: string[]
    emitted: boolean
    isOverSizeLimit?: boolean
    name: string
    size: number
    theme: AppProps['theme']
  }

  export interface UseProgress {
    (): [UseProgress.State, UseProgress.Handler]
  }

  export namespace UseProgress {
    export type State = {
      percentage: Percentage
      msg: string
    }

    export type Handler = (
      percentage: number,
      msg: string,
    ) => void

    export interface Percentage {
      display: string
      decimal: number
    }
  }

  export interface DevServerStatus {
    enabled: boolean
    host: string
    port: number
    status: number
    label: string
    colors: Styles['colors']
  }

  export type FetchStatus = (
    enabled: boolean,
    host: string,
    port: number,
    update: CallableFunction,
  ) => Promise<void>
}
