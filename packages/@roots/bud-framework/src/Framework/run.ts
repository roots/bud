import {ProgressPlugin, chalk} from '@roots/bud-support'

/**
 * Framework.Run
 */
export function run(): void {
  this.logger.info({}, 'Running build.')

  /**
   * Inject HMR scripts if running in dev.
   *
   * @note This is the last moment before CLI/non-CLI builds lose
   * shared context.
   */
  this.isDevelopment && this.server.inject()

  /**
   * When using the Bud dashboard we can just call the CLI
   * and bounce early.
   */
  if (!this.store.enabled('options.ci')) {
    this.dashboard.run()
    return
  }

  /**
   * Builds everything and compiles it with webpack.
   */
  this.compiler.compile()

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
  new ProgressPlugin((percentage, message) => {
    const progress = {
      decimal: percentage,
      percentage: `${Math.floor(percentage * 100)}%`,
      message,
    }

    this.logger.info({
      msg: progress.message,
      percentage: progress.percentage,
    })
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
function displayCompilation(): void {
  if (this.store.has(`compilation.errors`)) {
    console.error(this.store.get(`compilation.errors`))
    process.exit()
  }

  this.store.has(`compilation.stats.string`) &&
    (() => {
      console.log(this.store.get(`compilation.stats.string`))
      this.store.delete(`compilation.stats.string`)
    })()

  this.store.has('compilation.progress') &&
    (() => {
      console.log(
        `${chalk.green(
          `[${this.store.get(
            `compilation.progress.percentage`,
          )}]`,
        )} ${this.store.get(`compilation.progress.message`)}\r`,
      )
      this.store.delete(`compilation.progress`)
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
  this.logger.info({
    msg: 'Production compilation callback (CI)',
  })

  err?.stack && this.store.set('compilation.errors', err.stack)

  if (!res) return

  res.toJson && res?.hasErrors() && error.bind(this)(res)

  res.toString && response.bind(this)(res)
}
