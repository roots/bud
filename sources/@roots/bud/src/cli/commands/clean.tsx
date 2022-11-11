import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {ensureDir, remove} from '@roots/bud-support/fs'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import BaseCommand from './base.js'

export default class CleanCommand extends BaseCommand {
  public static override paths = [[`clean`]]

  public static override usage = Command.Usage({
    category: `tasks`,
    description: `Clean project artifacts and caches`,
    details: `
      \`bud clean\` empties the \`@dist\` and \`@storage\` directories.

      \`bud clean @dist\` empties the \`@dist\` directory.

      \`bud clean @storage\` empties the \`@storage\` directory.
`,
    examples: [
      [`Clean artifacts/caches`, `$0 clean`],
      [`Clean dist`, `$0 clean @dist`],
      [`Clean storage`, `$0 clean @storage`],
    ],
  })

  public override notify = Option.Boolean(`--notify`, false, {
    hidden: true,
  })

  public storage = Option.Boolean(`@storage`, false, {
    description: `empty @storage`,
  })

  public dist = Option.Boolean(`@dist`, false, {
    description: `empty @dist`,
  })

  /**
   * Set CI to true
   */
  public override dry = true

  public override get args() {
    return {...this.context.args, dry: true}
  }

  @bind
  public override async runCommand() {
    try {
      await this.app.run()
    } catch (e) {}

    if (this.storage || (!this.storage && !this.dist)) {
      await this.cleanStorage()
    }
    if (this.dist || (!this.storage && !this.dist)) {
      await this.cleanDist()
    }
  }

  @bind
  public async cleanDist() {
    try {
      await remove(this.app.path(`@dist`))

      await this.renderOnce(
        <Box>
          <Text color="green">✔ emptied {this.app.path(`@dist`)}</Text>
        </Box>,
      )
    } catch (err) {
      this.context.stderr.write(err)
    }
  }

  @bind
  public async cleanStorage() {
    try {
      await ensureDir(this.app.path(`@storage`))
      await remove(this.app.path(`@storage`))

      await this.renderOnce(
        <Box>
          <Text color="green">✔ emptied {this.app.path(`@storage`)}</Text>
        </Box>,
      )
    } catch (err) {
      this.context.stderr.write(err)
    }
  }
}
