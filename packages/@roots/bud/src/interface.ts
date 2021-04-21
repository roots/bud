import '@roots/bud-hooks'
import {Server} from '@roots/bud-framework'
import type {Theme} from '@roots/ink-use-style'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Pkgs {
      [key: string]: Pkg
    }

    interface Pkg {
      path: string
      type: 'preset' | 'extension'
      core: boolean
      [key: string]: any
    }

    interface Config {
      server: Server['config']
      theme: Theme
    }
  }
}
