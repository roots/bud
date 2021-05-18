import type {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.run  [💁 Fluent]
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
  ).when(
    !this.store.isTrue('ci'),
    this.dashboard.run,
    ci.bind(this),
  )
}

/**
 * Run CI Mode
 */
function ci() {
  this.when(this.isDevelopment, dev.bind(this), prod.bind(this))
}

/**
 * Run in development
 */
function dev() {
  const instance = this.compiler.compile(this.build.config)

  instance.hooks.done.tap(this.name, this.compiler.callback)

  this.server.run(instance)
}

/**
 * Run in production
 */
function prod() {
  const instance = this.compiler.compile(this.build.config)

  instance.hooks.done.tap(this.name, () =>
    setTimeout(process.exit, 2000),
  )

  instance.run(this.compiler.callback)
}
