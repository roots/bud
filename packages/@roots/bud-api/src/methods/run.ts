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
  this.hooks.on('before', this)

  this.when(
    this.isDevelopment &&
      this.server.config.isTrue('middleware.hot'),
    this.server.inject,
  )

  this.when(
    !this.store.isTrue('ci'),
    this.dashboard.run,
    ci.bind(this),
  )
}

function ci() {
  this.when(this.isDevelopment, dev.bind(this), prod.bind(this))
}

function dev() {
  const instance = this.compiler.compile(
    this.hooks.filter('after'),
  )

  instance.hooks.done.tap(this.name, this.compiler.callback)

  this.server.run(instance)
}

function prod() {
  const instance = this.compiler.compile(
    this.hooks.filter('after'),
  )

  instance.hooks.done.tap(this.name, () =>
    setTimeout(process.exit, 1000),
  )

  instance.run(this.compiler.callback)
}
