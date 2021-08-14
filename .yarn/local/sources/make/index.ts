import {Command} from '../Command'
import {Option} from 'clipanion'

export class MakeCommand extends Command {
  static paths = [[`kjo`, `make`]]

  public dfx = Option.Boolean(`-d,--dfx`, false)

  async execute() {
    await this.$(`yarn kjo clean`)
    await this.$(`yarn install --immutable`)
    await this.$(`yarn kjo build`)
    await this.$(`yarn kjo test --unit --integration`)
    await this.$(`yarn`)
    await this.$(`yarn kjo lint`)
  }
}
