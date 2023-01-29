import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'
import {bind} from 'helpful-decorators'

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
   * @internal
   */
  @bind
  public log(message: string): void {
    const label = this.name ?? `@bud`
    process.stdout.write(`[${label}] ${message}\n`)
  }

  /**
   * Logs message to process.stderr
   *
   * @internal
   */
  @bind
  public err(error: string | Error): void {
    const label = this.name ?? `@bud`
    throw Error(
      `[${label}] ${typeof error === `string` ? error : error.message}\n`,
    )
  }

  /**
   * Execute a series of tasks
   *
   * @internal
   */
  @bind
  public async $(...tasks: Array<string>): Promise<void> {
    const project = await this.getProject()

    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        this.log(task)

        const code = await execute(task, [], {cwd: project.cwd})

        if (code !== 0)
          throw new Error(`${task} failed with code ${code}`)
      }),
    )
  }

  /**
   * Try executing a shell command
   *
   * @internal
   */
  public async tryExecuting(bin: string, args: string[], opts: any = {}) {
    try {
      const code = await execute(bin, args, opts)
      if (code !== 0) {
        throw new Error(`❌ ${bin} ${args.join(` `)} failed`)
      }
      return code
    } catch (e) {
      this.context.stderr.write(e.message)
    }
  }
}
