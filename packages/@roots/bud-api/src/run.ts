import {Framework} from '@roots/bud-framework'
import {chalk, webpack} from '@roots/bud-support'

type Run = () => unknown

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
    run: Run
  }
}

export function run(this: Framework): Promise<void> {
  /**
   * Inject HMR scripts if running in dev.
   *
   * @note This is the last moment
   * before CLI/non-CLI builds lose shared context.
   */
  this.isDevelopment &&
    this.server.config.isTrue('middleware.hot') &&
    this.server.inject()

  /**
   * When using the Bud dashboard we can just call the CLI
   * and bounce early.
   */
  if (!this.store.isTrue('options.ci')) {
    this.dashboard.run()
    return
  }

  /**
   * Builds everything and compiles it with webpack.
   */
  const build = this.build.make()
  this.compiler.compile(build)

  /**
   * Delegate stats hook to the compilerHook function.
   * As webpack doesn't really have a node API for running
   * in dev this is our last real chance to get insight on dev builds.
   */
  this.compiler.instance.hooks.done.tap(
    'bud',
    compilerHook.bind(this),
  )

  /**
   * Instantiate a new progress plugin and apply it
   * to the compilation instance.
   */
  new webpack.ProgressPlugin((percentage, message) => {
    const progress = {
      decimal: percentage,
      percentage: `${Math.floor(percentage * 100)}%`,
      message,
    }

    this.info(`${progress.message} [${progress.percentage}]`)

    this.store.set('compilation.progress', progress)
  }).apply(this.compiler.instance)

  /**
   * When in production, just run the build.
   * When in development, run dev server.
   */
  this.when(
    !this.isDevelopment,
    () => this.compiler.instance.run(runCallback.bind(this)),
    () => this.server.run(this.compiler.instance),
  )
}

/**
 * Handles display output of compilation / dev server.
 */
function displayCompilation(this: Framework): void {
  if (this.store.has(`compilation.errors`)) {
    this.error(this.store.get(`compilation.errors`))
    process.exit()
  }

  this.store.get(`compilation.stats.string`) &&
    (() => {
      this.log(this.store.get(`compilation.stats.string`))
      this.store.set(`compilation.stats.string`, null)
    })()

  this.store.has('compilation.progress') &&
    (() => {
      this.log(
        `${chalk.green(
          `[${this.store.get(
            `compilation.progress.percentage`,
          )}]`,
        )} ${this.store.get(`compilation.progress.message`)}\r`,
      )
      this.store.set(`compilation.progress`)
    })()
}

/**
 * Handle error.
 */
function error(res) {
  this.store.set(
    'compilation.errors',
    res
      .toJson(this.compiler.statsOptions.json)
      .errors.toString(),
  )

  /**
   * Keep the process alive while output is displayed.
   */
  displayCompilation.bind(this)()
}

/**
 * Handle response.
 */
function response(res): void {
  this.store.set('compilation.stats', {
    string: res.toString(this.compiler.statsOptions.string),
    json: res.toJson(this.compiler.statsOptions.json),
  })

  /**
   * Keep the process alive while output is displayed.
   */
  displayCompilation.bind(this)()
}

/**
 * Handles compilation stats.
 */
function compilerHook(res): void {
  if (!res) return

  res.hasErrors() && error.bind(this)(res)
  res.toJson && response.bind(this)(res)
}

/**
 * Handles stats for production builds.
 */
function runCallback(err, res): void {
  this.info({
    msg: 'Production compilation callback (CI)',
  })

  err?.stack && this.store.set('compilation.errors', err.stack)

  if (!res) return

  res.toJson && res?.hasErrors() && error.bind(this)(res)

  res.toString && response.bind(this)(res)
}
