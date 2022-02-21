import {bind, chalk, fs} from '@roots/bud-support'
import {Command} from 'clipanion'

import {factory} from '../../factory/index.js'
import {Notifier} from '../Notifier/index.js'
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
    this.app = await factory({config: this.config()})
    await this.cleanProjectAssets()
  }

  @bind
  public async cleanProjectAssets() {
    this.notifier = new Notifier(this.app)

    process.stdout.write('clearing artifacts\n')

    try {
      process.stdout.write(`emptying ${this.app.path('storage')}\n`)

      await ensureDir(this.app.path('storage'))
      await remove(this.app.path('storage'))

      process.stdout.write(
        chalk.green(`✔ emptying ${this.app.path('storage')}\n`),
      )
    } catch (err) {
      process.stderr.write(chalk.red(err))
    }

    try {
      process.stdout.write(`emptying ${this.app.path('dist')}\n`)

      await remove(this.app.path('dist'))

      process.stdout.write(
        chalk.green(`✔ emptying ${this.app.path('dist')}\n`),
      )
    } catch (err) {
      this.app.error(err)
    }
  }

  @bind
  public async run() {
    await this.app.api.call('run')
  }
}
