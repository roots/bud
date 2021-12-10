import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

/**
 * Base class
 *
 * @internal
 */
export abstract class Command extends BaseCommand {
  /**
   * Get manifest contents
   *
   * @internal
   */
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Get project configuration
   *
   * @internal
   */
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
   */
  public async getProject() {
    const configuration = await this.getConfiguration()

    const {project} = await Project.find(
      configuration,
      this.context.cwd,
    )

    return project
  }

  /**
   * Get workspace info
   *
   * @internal
   */
  public async getWorkspace() {
    const configuration = await this.getConfiguration()

    const {workspace} = await Project.find(
      configuration,
      this.context.cwd,
    )

    return workspace
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough?: Array<string>

  /**
   * Append passthrough arguments to the command
   *
   * @internal
   */
  public withPassthrough(str: string): string {
    return this.passthrough.length
      ? this.passthrough.reduce(
          (a, c) => (!c ? `${a}` : `${a} ${c}`),
          str,
        )
      : str
  }

  /**
   * Execute a shell command or series of shell commands
   *
   * @remarks
   * Commands are executed in parallel
   *
   * @internal
   */
  public async $(...tasks: Array<string>): Promise<void> {
    const project = await this.getProject()

    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        console.log(`@bud | ${task}\n`)

        try {
          const code = await execute(task, [], {
            cwd: project.cwd,
          })

          if (code !== 0)
            throw new Error(
              `@bud | ${task} failed with code ${code}\n`,
            )
        } catch (e) {
          throw new Error(e)
        }
      }),
    )
  }
}
