import {ChildProcess, fork} from 'node:child_process'
import {fileURLToPath} from 'node:url'

import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {isFunction} from '@roots/bud-support/lodash-es'
import chokidar from 'chokidar'
import {resolve} from 'import-meta-resolve'
import terminate from 'terminate'

import BuildCommand from './build.base.js'

/**
 * `bud build development` command
 *
 * @public
 */
export default class BuildDevelopmentCommand extends BuildCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [
    [`build`, `development`],
    [`dev`],
    [`development`],
  ]

  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    category: `build`,
    description: `Compiles source assets in \`development\` mode.`,
    details: `\
      \`bud build development\` compiles source assets in \`development\` mode.
    `,
    examples: [
      [`compile source and serve`, `$0 build development`],
      [
        `open project in system default browser`,
        `$0 build development --browser`,
      ],
      [
        `do not force reload in the browser when encountering a fatal HMR error`,
        `$0 build development --no-reload`,
      ],
      [
        `do not display an error overlay when encountering errors in application code`,
        `$0 build development --no-overlay`,
      ],
    ],
  })

  /**
   * --mode
   * @public
   */
  public mode: `development` = `development`

  /**
   * --browser
   * @public
   */
  public browser = Option.String(`--browser`, undefined, {
    description: `Open browser on successful development build.`,
    tolerateBoolean: true,
  })

  /**
   * --indicator
   * @public
   */
  public indicator = Option.Boolean(`--indicator`, undefined, {
    description: `Enable development status indicator`,
  })

  /**
   * --overlay
   * @public
   */
  public overlay = Option.Boolean(`--overlay`, undefined, {
    description: `Enable error overlay in development mode`,
  })

  /**
   * --reload
   * @public
   */
  public reload = Option.Boolean(`--reload`, undefined, {
    description: `Reload browser on unrecoverable error`,
  })

  public buildDependenciesWatcher: chokidar.FSWatcher
  public process: ChildProcess

  /**
   * Execute command
   *
   * @public
   */
  @bind
  public async execute() {
    this.context = {
      ...this.context,
      mode: this.args?.mode ?? this.baseArgs.mode ?? this.context.mode,
      args: {
        ...this.context.args,
        ...this.baseArgs,
        ...(this.args ?? {}),
      },
    }

    const configs = [...Object.values(this.context.config)].map(
      ({path}) => path,
    )

    try {
      let childPath = await resolve(`../../run.dev.js`, import.meta.url)
      this.process = fork(fileURLToPath(childPath), [])
    } catch (e) {}

    if (isFunction(this.buildDependenciesWatcher?.close))
      this.buildDependenciesWatcher.close()

    this.buildDependenciesWatcher = chokidar
      .watch(configs, {ignoreInitial: true})
      .on(`change`, async (file, stats) => {
        if (this.process?.pid) {
          try {
            this.context.stdout.write(`\nCreating new bud process \n`)
            this.context.stdout.write(
              `\nYou will need to manually refresh your web browser in order to connect to the new instance \n`,
            )

            let childPath = await resolve(
              `../../run.dev.js`,
              import.meta.url,
            )

            if (this.process?.pid) terminate(this.process.pid)
            this.process = fork(fileURLToPath(childPath), [])
          } catch (err) {
            process.stderr.write(`\n${err.message}`)
          }
        }
      })

    process.stdin.once(`data`, async k => {
      if (k.toString() === `\u0003`) {
        try {
          if (this.process?.pid) terminate(this.process.pid)
        } catch (e) {
          // noop
        }

        try {
          if (isFunction(this.buildDependenciesWatcher?.close))
            this.buildDependenciesWatcher.close()
        } catch (e) {
          // noop
        }
        // eslint-disable-next-line n/no-process-exit
        process.exit()
      }
    })
  }
}
