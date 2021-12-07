import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

/**
 * Base class
 *
 * @public
 */
export abstract class Command extends BaseCommand {
  /**
   * Get manifest contents
   *
   * @public
   */
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

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
   * @public
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
   * @public
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
   * Execute a shell command or series of shell commands
   *
   * @remarks
   * Commands are executed in parallel
   *
   * @public
   */
  public async $(...tasks: Array<string>): Promise<void> {
    const project = await this.getProject()

    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        process.stdout.write(`[repo] ${task}\n`)

        try {
          const code = await execute(task, [], {
            cwd: project.cwd,
          })

          if (code !== 0)
            throw new Error(
              `[repo] ${task} failed with code ${code}\n`,
            )

          process.stdout.write(
            `[repo] ${task} completed with code ${code}\n`,
          )
        } catch (e) {
          throw new Error(e)
        }
      }),
    )
  }
}
