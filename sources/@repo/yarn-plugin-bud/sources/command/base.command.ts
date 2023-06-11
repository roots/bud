import {BaseCommand} from '@yarnpkg/cli'
import {type Ora, oraPromise} from 'ora'

export abstract class Command extends BaseCommand {
  public promised: Array<Promise<any>>

  public constructor() {
    super()
    this.promised = []
  }

  public async promise(
    text: string,
    successText: string,
    failText: string,
    promise: Promise<any>,
  ): Promise<any> {
    return oraPromise(promise, {
      failText,
      spinner: `dots8`,
      successText,
      text: `${text.trim()}... `,
    })
  }
}
