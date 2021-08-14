import {Command} from '../Command'
import {Option} from 'clipanion'

export class CleanCommand extends Command {
  static paths = [[`kjo`, `clean`]]

  public dfx = Option.Boolean(`-d,--dfx`, false)

  async execute() {
    if (this.dfx) {
      await this.$(`git clean -dfx`)
      await this.$(`yarn cache clean`)

      return
    }

    console.log(`rimraf **/.budfiles`)
    await this.$(`yarn rimraf **/.budfiles`)

    console.log(`rimraf examples/*/node_modules`)
    await this.$(`yarn rimraf examples/*/node_modules`)

    console.log(`rimraf examples/*/dist`)
    await this.$(`yarn rimraf examples/*/dist`)

    console.log(`rimraf examples/sage/public/*`)
    await this.$(`yarn rimraf examples/sage/public/*`)

    console.log(`rimraf examples/sage/storage/bud/*`)
    await this.$(`yarn rimraf examples/sage/storage/bud/*`)

    console.log(`rimraf packages/@roots/*/lib`)
    await this.$(`yarn rimraf packages/@roots/*/lib`)

    console.log(`rimraf packages/@roots/*/types`)
    await this.$(`yarn rimraf packages/@roots/*/types`)

    console.log(`rimraf packages/@roots/*/node_modules`)
    await this.$(`yarn rimraf packages/@roots/*/node_modules`)

    console.log(`rimraf node_modules`)
    await this.$(`yarn rimraf node_modules`)

    console.log(`cache clean`)
    await this.$(`yarn cache clean`)
  }
}
