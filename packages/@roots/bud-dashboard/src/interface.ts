import {Write} from './Write'
import {Compiler, Service} from '@roots/bud-framework'
import {React, Instance, render} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'

declare module '@roots/bud-framework' {
  interface Framework {
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

    interface AppProps {
      bud?: Framework
      pkg?: {[key: string]: any}
      screens?: Array<[number, number]>
      theme?: Styles
      stats?: Framework.Compiler.Stats.Output['json']
      progress?: {
        percentage: string
        decimal: number
        message: string
      }
      errors?: string[]
      hasErrors?: boolean
      warnings?: string[]
      hasWarnings?: boolean
    }

    type Component = React.FunctionComponent<Partial<AppProps>>

    interface Compilation {
      progress: {
        percentage: string
        decimal: number
        message: string
      }
      stats: Compiler.Stats.Output['json']
      errors?: string[]
      hasErrors: boolean
      warnings?: string[]
      hasWarnings: boolean
    }

    namespace Compilation {
      interface Hook {
        (app: Framework): Compilation
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

      type Handler = React.Dispatch<
        React.SetStateAction<UseFocus.Focus>
      >
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
