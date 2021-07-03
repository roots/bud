import type {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.run
     *
     * Run the build
     *
     * ### Usage
     *
     * ```js
     * bud.run()
     * ```
     */
    run: Api.Run
  }

  namespace Api {
    type Run = (this: Framework) => void
  }
}

export const run: Api.Run = function (): void {
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
