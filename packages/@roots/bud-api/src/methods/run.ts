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
    type Run = () => void
  }
}

export const run: Api.Run = function (): void {
  this.when(
    this.isDevelopment &&
      this.server.config.isTrue('middleware.hot'),
    this.server.inject,
  )

  if (this.mode == 'development') {
    this.server.run()
  } else {
    this.compiler.compile()
    this.compiler.instance.run(this.compiler.callback)
  }
}
