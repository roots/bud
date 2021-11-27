import {BaseCommand} from '@yarnpkg/cli'
import {Manifest} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

const enum CODE {
  ERROR = 1,
  OK = 0,
}

/**
 * Base class
 *
 * @public
 */
export abstract class Command extends BaseCommand {
  /**
   * Get manifest
   *
   * @public
   */
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Run a task or series of tasks
   *
   * @public
   */
  public async $(...tasks: Array<string>): Promise<CODE> {
    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        process.stdout.write(`[repo] ${task}`)

        try {
          const code = await execute(task)

          if (code !== 0)
            throw new Error(
              `[repo] ${task} failed with code ${code}`,
            )

          process.stdout.write(
            `[repo] ${task} completed with code ${code}`,
          )
        } catch (e) {
          throw new Error(e)
        }
      }),
    )
  }
}
