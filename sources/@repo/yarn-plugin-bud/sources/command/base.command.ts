import {BaseCommand} from '@yarnpkg/cli'

export abstract class Command extends BaseCommand {
  public result: number = 0

  public async throwIfError(number: number) {
    if (number !== 0) throw new Error(`command failed`)
  }
}
