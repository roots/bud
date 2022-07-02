import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'
import {Option} from 'clipanion'
import {bind} from 'helpful-decorators'

import {YarnRC} from '../yarnrc/yarnrc'
import {Yml} from '../yarnrc/yml'

/**
 * Base class
 *
 * @internal
 */
export abstract class Command extends BaseCommand {
  /**
   * Command paths
   *
   * @internal
   */
  public name: string

  /**
   * --dry-run flag
   *
   * @internal
   */
  public dryRun = Option.Boolean('--dry-run', false, {
    description: 'log output to console',
  })

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough?: Array<string>

  /**
   * Get manifest contents
   *
   * @internal
   */
  @bind
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Get yarnrc helper
   *
   * @internal
   */
  @bind
  public async getYarnYml(): Promise<Yml> {
    return await YarnRC.find(this.context)
  }

  /**
   * Get project configuration
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async getConfiguration() {
    const configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins,
    )

    return configuration
  }

  /**
   * Get project info
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async getProject() {
    const configuration = await this.getConfiguration()

    const {project} = await Project.find(configuration, this.context.cwd)

    return project
  }

  /**
   * Append passthrough arguments to the command
   *
   * @internal
   */
  @bind
  public withPassthrough(str: string): string {
    return this.passthrough.length
      ? this.passthrough.reduce((a, c) => (!c ? `${a}` : `${a} ${c}`), str)
      : str
  }

  /**
   * Logs message to process.stdout
   *
   * @param message - message to log
   *
   * @internal
   */
  @bind
  public log(message: string): void {
    const label = this.name ?? '@bud'
    process.stdout.write(`[${label}] ${message}\n`)
  }

  /**
   * Logs message to process.stderr
   *
   * @param message - message to log
   *
   * @internal
   */
  @bind
  public err(error: string | Error): void {
    const label = this.name ?? '@bud'
    process.stderr.write(
      `[${label}] ${typeof error === 'string' ? error : error.message}\n`,
    )
  }

  /**
   * Execute a dry run
   *
   * @internal
   */
  @bind
  public async _dry(...tasks: Array<string>): Promise<void> {
    tasks.forEach(task => this.log(JSON.stringify(task)))
  }

  /**
   * Execute a series of tasks
   *
   * @param tasks - Any number of string commands
   * @internal
   */
  @bind
  public async $(...tasks: Array<string>): Promise<void> {
    const project = await this.getProject()

    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        this.log(task)

        try {
          const code = await execute(task, [], {
            cwd: project.cwd,
          })

          if (code !== 0)
            throw new Error(`${task} failed with code ${code}`)
        } catch (e) {
          await this.err(e)
        }
      }),
    )
  }
}
