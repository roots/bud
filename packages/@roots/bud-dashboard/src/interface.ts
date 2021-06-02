import type {Styles} from '@roots/ink-use-style'
import type React from 'react'
import type {StatsCompilation} from 'webpack'
import type {Write} from './Write'

declare module '@roots/bud-framework' {
  interface Framework {
    write: typeof Write
  }

  namespace Dashboard {
    interface Props {
      bud: Framework
    }

    interface AppProps extends Compilation {
      bud: Framework
      theme: Styles
    }

    type Component = React.FunctionComponent<Partial<AppProps>>

    export interface Compilation {
      progress: {
        percentage: string
        decimal: number
        message: string
      }
      stats: StatsCompilation
      errors?: Compilation.WebpackMessage[]
      hasErrors: boolean
      warnings?: Compilation.WebpackMessage[]
      hasWarnings: boolean
      closed: boolean
    }

    namespace Compilation {
      interface Hook {
        (app: Framework): Compilation
      }

      interface WebpackMessage {
        moduleIdentifier?: string
        moduleName?: string
        message: string
      }
    }

    interface Asset {
      chunks?: (number | string)[]
      chunkNames?: (number | string)[]
      emitted?: boolean
      isOverSizeLimit?: boolean
      name?: string
      size?: number
      theme?: AppProps['theme']
    }

    interface UseProgress {
      (): [UseProgress.State, UseProgress.Handler]
    }

    namespace UseProgress {
      type State = {
        percentage: Percentage
        msg: string
      }

      type Handler = (percentage: number, msg: string) => void

      interface Percentage {
        display: string
        decimal: number
      }
    }

    namespace UseGit {
      interface Status {
        isRepo: boolean
        head: string
        branch: string
        status: string[]
        untracked: string[]
        hasError: boolean
      }
    }

    interface DevServerStatus {
      enabled: boolean
      host: string
      port: number
      status: number
      label: string
      colors: Styles['colors']
    }

    type FetchStatus = (
      enabled: boolean,
      host: string,
      port: number,
      update: CallableFunction,
    ) => Promise<void>

    interface Error {
      (body?: string, title?: string): void
    }
  }
}
