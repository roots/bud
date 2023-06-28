import {BaseCommand} from '@yarnpkg/cli'
import {oraPromise} from 'ora'

export abstract class Command extends BaseCommand {
  public promised: Array<Promise<any>>

  public result: number = 0

  public constructor() {
    super()
    this.promised = []
  }

  /**
   * Error handler
   * @param error
   */
  public async catch(error: Error) {
    this.result = 1
    throw error
  }

  public async promise(
    text: string,
    successText: string,
    failText: string,
    promise: Promise<any>,
  ): Promise<any> {
    return await oraPromise(promise, {
      failText,
      spinner: `dots8`,
      successText,
      text: `${text.trim()}... `,
    }).catch(error => {
      this.context.stderr.write(error.message)
      this.result = 1
    })
  }
}
