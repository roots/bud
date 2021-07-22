import type {Framework} from '@roots/bud-framework'
import type React from 'react'

declare module '@roots/bud-framework' {
  namespace Dashboard {
    interface Props {
      bud: Framework
    }

    type Component = React.FunctionComponent

    interface Asset {
      chunks?: (number | string)[]
      chunkNames?: (number | string)[]
      emitted?: boolean
      isOverSizeLimit?: boolean
      name?: string
      size?: number
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

    interface Error {
      (body?: string, title?: string): void
    }
  }
}

export {}
