import {BaseCommand} from '@yarnpkg/cli'
import {Manifest} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

const enum CODE {
  ERROR = 1,
  OK = 0,
}

export abstract class Command extends BaseCommand {
  static usage = {category: `kjo`}

  /**
   * Get manifest
   */
  public async getManifest(): Promise<Manifest> {
    return await Manifest.tryFind(this.context.cwd)
  }

  /**
   * Run a task or series of tasks
   */
  public async $(task: string) {
    let exitCode: CODE

    console.log(`[kjo] ${task}`)

    exitCode = await this.runTask(task)

    this.taskFailed(exitCode) && process.exit(CODE.ERROR)
    return Promise.resolve(CODE.OK)
  }

  /**
   * Run a single task
   */
  public runTask(task: string): Promise<CODE> {
    const [invoke, ...params] = task.split(' ')
    return execute(invoke, params)
  }

  /**
   * Check task status
   */
  public taskFailed(code: CODE) {
    return Array.isArray(code)
      ? code.filter(c => c !== CODE.OK).length > 0
      : code !== CODE.OK
  }

  /**
   * Promise OK
   */
  public async promiseOK(): Promise<CODE> {
    return CODE.OK
  }
}
