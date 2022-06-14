import {BaseCommand} from '@yarnpkg/cli'
import {execute} from '@yarnpkg/shell'
import {bind} from 'helpful-decorators'

/**
 * Base class
 *
 * @internal
 */
export abstract class Command extends BaseCommand {
  /**
   * Execute a series of tasks
   *
   * @param tasks - Any number of string commands
   * @internal
   */
  @bind
  public async _$(...tasks: Array<string>): Promise<void> {
    await Promise.all(
      tasks.map(async task => {
        if (!task) return

        try {
          const code = await execute(task, [], {
            cwd: this.context.cwd,
          })

          if (code !== 0)
            this.context.stderr.write(`${task} failed with code ${code}`)
        } catch (e) {
          this.context.stderr.write(e)
        }
      }),
    )
  }

  /**
   * Execute a shell command or series of shell commands
   *
   * @remarks
   * Commands are executed in parallel
   *
   * @internal
   */
  @bind
  public async $(...tasks: Array<string>): Promise<void> {
    return await this._$(...tasks)
  }
}
