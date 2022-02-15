import {bind, fs} from '@roots/bud-support'
import {Command} from 'clipanion'

import {factory} from '../../factory/index.js'
import {Notifier} from '../Notifier/index.js'
import {BuildCommand} from './build.js'

const {ensureDir, remove} = fs

export class CleanCommand extends BuildCommand {
  public static paths = [[`clean`]]

  public static usage = Command.Usage({
    category: `Clean`,
    description: `Clean project artifacts and caches`,
    details: `
      A longer description of the command with some \`markdown code\`.
      
      Multiple paragraphs are allowed. Clipanion will take care of both reindenting the content and wrapping the paragraphs as needed.
    `,
    examples: [[`Clean artifacts/caches`, `$0 clean`]],
  })

  public async execute() {
    this.app = await factory({config: this.config()})
    await this.cleanProjectAssets()
  }

  @bind
  public async cleanProjectAssets() {
    this.notifier = new Notifier(this.app)

    this.logger.info('clearing artifacts')

    try {
      this.logger.pending(`emptying ${this.app.path('storage')}`)

      await ensureDir(this.app.path('storage'))

      await remove(this.app.path('storage'))

      this.logger.success(`emptying ${this.app.path('storage')}`)
    } catch (err) {
      this.app.error(err)
    }

    try {
      this.logger.pending(`emptying ${this.app.path('dist')}`)

      await remove(this.app.path('dist'))

      this.logger.success(`emptying ${this.app.path('dist')}`)
    } catch (err) {
      this.app.error(err)
    }
  }

  @bind
  public async run() {
    await this.app.api.call('run')
  }
}
