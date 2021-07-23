import {BaseCommand} from '@yarnpkg/cli'
import {Manifest} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

const ERROR = 1
const OK = 0

export abstract class Command extends BaseCommand {
  static usage = {category: `kjo`}

  /**
   * Get manifest
   */
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Run a series of sequential and/or parallel taskes
   */
  public async $(options: Array<string | string[]>) {
    const exitCode = await options.reduce(
      this.sequential.bind(this),
      this.promiseOK(),
    )

    this.taskFailed(exitCode) && process.exit(ERROR)

    return Promise.resolve(OK)
  }

  /**
   * Run tasks sequentially
   */
  public async sequential(
    promise: Promise<number>,
    task: string | string[],
  ): Promise<number> {
    const exitCode = await promise

    if (this.taskFailed(exitCode)) return ERROR

    return Array.isArray(task)
      ? this.$(task)
      : this.runTask(task)
  }

  /**
   * Run a single task
   */
  public runTask(task: string): Promise<number> {
    const [invoke, ...params] = task.split(' ')
    return execute(invoke, params)
  }

  /**
   * Check task status
   */
  public taskFailed(code: number) {
    return Array.isArray(code)
      ? code.filter(c => c !== OK).length > 0
      : code !== OK
  }

  /**
   * Promise OK
   */
  public async promiseOK(): Promise<number> {
    return OK
  }
}
