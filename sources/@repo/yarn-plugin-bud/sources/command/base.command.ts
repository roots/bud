/* eslint-disable n/no-process-env */
import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute, UserOptions} from '@yarnpkg/shell'
import {bind} from 'helpful-decorators'
import ora, {Ora} from 'ora'

/**
 * Base class
 */
export abstract class Command extends BaseCommand {
  /**
   * Command paths
   */
  public name: string

  /**
   * Spinner
   */
  public spinner: Ora

  /**
   * Variadic arguments
   */
  public passthrough?: Array<string>

  /**
   * Get manifest contents
   */
  @bind
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Get project configuration
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
   * @decorator `@bind`
   */
  @bind
  public async getProject() {
    const {project} = await Project.find(
      await this.getConfiguration(),
      this.context.cwd,
    )
    return project
  }

  /**
   * Append passthrough arguments to the command
   */
  @bind
  public withPassthrough(str: string): string {
    return this.passthrough.length
      ? this.passthrough.reduce((a, c) => (!c ? `${a}` : `${a} ${c}`), str)
      : str
  }

  /**
   * Logs message to process.stdout
   */
  @bind
  public log(...messages: Array<string>): void {
    const label = this.name ?? `@bud`
    messages.map(message =>
      process.stdout.write(`[${label}] ${message}\n`),
    )
  }

  /**
   * Logs message to process.stderr
   */
  @bind
  public err(error: string | Error): void {
    const label = this.name ?? `@bud`

    throw new Error(
      `[${label}] ${typeof error === `string` ? error : error.message}\n`,
    )
  }

  /**
   * Execute a series of tasks
   */
  @bind
  public async $(
    ...tasks: Array<
      string | [string, Array<string>, Partial<UserOptions>?, boolean?]
    >
  ): Promise<number> {
    let code = 0;

    const project = await this.getProject()

    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        const [bin, args, options, disableSpinner]: [
          string,
          Array<string>,
          Partial<UserOptions>?,
          boolean?,
        ] = Array.isArray(task) ? task : [task, [], {}, false]

        const ident = `${bin} ${args.join(` `)}`.replace(project.cwd, `.`)
        if (!disableSpinner) {
          this.spinner = ora({
            stream: this.context.stdout,
          })      
          this.spinner.start(ident)
        }

        try {
          const result = await execute(bin, args, {
            // @ts-ignore
            stdout: `ignore`,
            // @ts-ignore
            stderr: `ignore`,
            cwd: project.cwd,
            ...(options ?? {}),
          })

          if (result !== 0) {
            code = result
            throw new Error(`failed with code ${result}`)
          }

          if (!disableSpinner) this.spinner.succeed()
        } catch (e) {
          if (!disableSpinner) this.spinner.fail()
          throw e
        }
      }),
    )

    return code
  }

  /**
   * Try executing a shell command
   */
  public async tryExecuting(bin: string, args: string[], opts: any = {}) {
    try {
      const code = await this.$([bin, args, opts, true])
      return code
    } catch (e) {
    }
  }
}
