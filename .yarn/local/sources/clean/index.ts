import {Command} from '../Command'
import {Option} from 'clipanion'

export class CleanCommand extends Command {
  static paths = [[`kjo`, `clean`]]

  public dfx = Option.Boolean(`--d,--dfx`, {
    required: false,
  })

  public commands = {
    rm: [
      `rm -rf **/.budfiles`,
      `rm -rf **/node_modules`,
      `rm -rf examples/*/dist`,
      `rm -rf examples/sage/public/*`,
      `rm -rf examples/sage/storage/bud/*`,
      `rm -rf packages/*/*/lib`,
      `rm -rf packages/*/*/types`,
      `yarn cache clean`,
    ],
    dfx: [`git clean -dfx`],
  }

  async execute() {
    this.dfx ? await this.$(this.commands.dfx) : this.commands.rm
  }
}
