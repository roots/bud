import chalk from 'chalk'
import {Command} from 'clipanion'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'

import {factory} from '../../factory/index.js'
import {BaseCommand} from './base.js'

const {ensureDir, remove} = fs

export class CleanCommand extends BaseCommand {
  public static paths = [[`clean`]]

  public static usage = Command.Usage({
    category: `Clean`,
    description: `Clean project artifacts and caches`,
    examples: [[`Clean artifacts/caches`, `$0 clean`]],
  })

  public async execute() {
    this.app = await factory()
    await this.make()
    await this.cleanProjectAssets()
  }

  @bind
  public async cleanProjectAssets() {
    this.context.stdout.write('clearing artifacts\n')

    try {
      this.context.stdout.write(`emptying ${this.app.path('@storage')}\n`)

      await ensureDir(this.app.path('@storage'))
      await remove(this.app.path('@storage'))

      this.context.stdout.write(
        chalk.green(`✔ emptying ${this.app.path('@storage')}\n`),
      )
    } catch (err) {
      this.context.stderr.write(chalk.red(err))
    }

    try {
      this.context.stdout.write(`emptying ${this.app.path('@dist')}\n`)

      await remove(this.app.path('@dist'))

      this.context.stdout.write(
        chalk.green(`✔ emptying ${this.app.path('@dist')}\n`),
      )
    } catch (err) {
      this.app.error(err)
    }

    this.app.close()
  }
}
