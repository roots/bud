import type Repository from '../'

export const run: Repository.Run = function (): void {
  this.dashboard.run()

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
