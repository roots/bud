import '@roots/bud-api'
import '@roots/bud-hooks'
import '@roots/bud-extensions'
import '@roots/bud-framework'

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
  }
}
