import {BaseCommand} from '@yarnpkg/cli'
import {type Ora, oraPromise} from 'ora'

export abstract class Command extends BaseCommand {
  public promised: Array<Promise<any>>

  public async promise(
    text: string,
    successText: string,
    failText: string,
    promise: Promise<any>,
  ): Promise<any> {
    return oraPromise(promise, {
      text: `${text.trim()}... `,
      failText,
      successText,
      spinner: `dots8`,
    })
  }

  public constructor() {
    super()
    this.promised = []
  }
}
