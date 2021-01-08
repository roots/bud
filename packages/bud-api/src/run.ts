import {Api} from '@roots/bud-typings'
import {ProgressPlugin, chalk} from '@roots/bud-support'
import type {Framework} from '@roots/bud-typings'

/**
 * Framework.Run
 */
export const run: Api.Run = function () {
  /**
   * Flag that we're compiling
   */
  this.store.set('__compiling', true)

  /**
   * Inject HMR scripts if running in dev.
   *
   * @note This is the last moment before CLI/non-CLI builds lose
   * shared context.
   */
  if (this.mode.is('development')) {
    this.server.injectHmr()
  }

  /**
   * When using the Bud dashboard we can just call the CLI
   * and bounce early.
   */
  if (!this.mode.ci) {
    this.cli.run()
    return this
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
  new ProgressPlugin((percentage, message) =>
    this.store.set('compilation.progress', {
      decimal: percentage,
      percentage: `${Math.floor(percentage * 100)}%`,
      message,
    }),
  ).apply(this.compiler.instance)

  /**
   * When in production, just run the build.
   * When in development, run dev server.
   */
  this.when(
    !this.mode.is('development'),
    () => this.compiler.instance.run(runCallback.bind(this)),
    () => this.server.run(this.compiler.instance),
  )

  /**
   * Keep the process alive while output is displayed.
   */
  setInterval(displayCompilation.bind(this), 100)

  return this
}

/**
 * Handles display output of compilation / dev server.
 */
function displayCompilation(this: Framework) {
  if (this.store.has(`compilation.errors`)) {
    console.error(this.store.get(`compilation.errors`))
    process.exit()
  }

  this.store.has(`compilation.stats.string`) &&
    console.log(this.store.get(`compilation.stats.string`))

  this.store.has('compilation.progress') &&
    console.log(
      `${chalk.green(
        `[${this.store.get(`compilation.progress.percentage`)}]`,
      )} ${this.store.get(`compilation.progress.message`)}\r`,
    )
}

/**
 * Handle err
 */
function error(res) {
  this.store.set(
    'compilation.errors',
    res
      .toJson(this.compiler.statsOptions.json)
      .errors.toString(),
  )
}

/**
 * Handle res
 */
function response(res) {
  this.store.set('compilation.stats', {
    string: res.toString(this.compiler.statsOptions.string),
    json: res.toJson(this.compiler.statsOptions.json),
  })
}

/**
 * Handles compilation stats.
 */
function compilerHook(this: Framework, res) {
  if (!res) return

  res.hasErrors() && error.bind(this)(res)
  res.toJson && response.bind(this)(res)
}

/**
 * Handles stats for production builds.
 */
function runCallback(this: Framework, err, res) {
  err?.stack && this.store.set('compilation.errors', err.stack)
  if (!res) return

  res.toJson && res?.hasErrors() && error.bind(this)(res)

  res.toString && response.bind(this)(res)
}
