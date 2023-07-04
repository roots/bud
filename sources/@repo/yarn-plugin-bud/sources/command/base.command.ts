import {BaseCommand} from '@yarnpkg/cli'

export abstract class Command extends BaseCommand {
  public promised: Array<Promise<any>>

  public result: number = 0

  public constructor() {
    super()
    this.promised = []
  }

  public async throwIfError(number: number) {
    if (number !== 0) throw new Error(`command failed`)
  }
}
