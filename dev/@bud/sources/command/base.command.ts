import {BaseCommand} from '@yarnpkg/cli'
import {Configuration, Manifest, Project} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

import {YarnRC} from '../yarnrc/yarnrc'
import {Yml} from '../yarnrc/yml'

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
   * Get yarnrc helper
   *
   * @internal
   */
  public async getYarnYml(): Promise<Yml> {
    return await YarnRC.find(this.context)
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
          await this.$(`yarn @bud config`)
          throw new Error(e)
        }
      }),
    )
  }
}
