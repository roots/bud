import '@roots/bud-compiler'

import type {Write} from './Write'
import type {Service} from '@roots/bud-framework'
import type {Instance, render} from 'ink'
import type React from 'react'
import type {Styles} from '@roots/ink-use-style'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## Dashboard
     *
     * CLI dashboard interface
     */
    dashboard: Dashboard

    write: typeof Write
  }

  interface Dashboard extends Service {
    /**
     * Service name
     */
    name: any

    /**
     * Instance
     */
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
     * Render
     */
    render: typeof render

    /**
     * Render error
     */
    renderError(body: string, title: string): Instance

    /**
     * Unmount CLI
     */
    kill(): void
  }

  namespace Dashboard {
    interface Props {
      bud: Framework
    }

    interface AppProps extends Compilation {
      bud: Framework
      pkg: {[key: string]: any}
      theme: Styles
    }

    type Component = React.FunctionComponent<Partial<AppProps>>

    export interface Compilation {
      progress: {
        percentage: string
        decimal: number
        message: string
      }
      stats: Compiler.Stats['json']
      errors?: Compilation.WebpackMessage[]
      hasErrors: boolean
      warnings?: Compilation.WebpackMessage[]
      hasWarnings: boolean
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
      chunks: Array<number | string>
      chunkNames: string[]
      emitted: boolean
      isOverSizeLimit?: boolean
      name: string
      size: number
      theme: AppProps['theme']
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

    namespace UseFocus {
      interface Hook {
        (initialData?: {initialData: Focus}): [Focus, Handler]
      }

      interface Focus {
        active: string
        items: Items
      }

      interface Items {
        [key: string]: boolean
      }

      type Handler = React.Dispatch<React.SetStateAction<Focus>>
    }

    namespace UseGit {
      interface Hook {
        (): Status
      }

      interface Res {
        stdout?: string
        stderr?: string
      }

      interface Status {
        head: string
        branch: string
        status: number
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
