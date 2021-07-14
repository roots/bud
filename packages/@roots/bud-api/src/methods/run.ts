import type {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## run
     *
     * Run the build
     *
     * ### Usage
     *
     * ```js
     * bud.run()
     * ```
     */
    run: Framework.Api.Run
  }

  namespace Framework.Api {
    type Run = (this: Framework) => void
  }
}

export const run: Framework.Api.Run = function (): void {
  const isDev =
    this.isDevelopment &&
    this.server?.run &&
    this.server?.config.isTrue('middleware.hot')

  const dev = () => {
    this.server?.inject()
    this.server?.run()
  }

  const prod = () => {
    this.compiler.compile().run(this.compiler.callback)
  }

  this.when(isDev, dev, prod)
}
