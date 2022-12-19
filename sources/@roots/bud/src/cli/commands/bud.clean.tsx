import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {ensureDir, remove} from '@roots/bud-support/fs'
import {Box, Text} from '@roots/bud-support/ink'
import {isString} from '@roots/bud-support/lodash-es'
import React from '@roots/bud-support/react'

import {dry} from '../decorators/command.dry.js'
import BudCommand from './bud.js'

@dry
export default class BudCleanCommand extends BudCommand {
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

  public shouldCleanStorage = Option.Boolean(`@storage`, false, {
    description: `empty @storage`,
  })
  public shouldCleanDist = Option.Boolean(`@dist`, false, {
    description: `empty @dist`,
  })

  @bind
  public override async execute() {
    await this.makeBud(this)
    await this.healthcheck(this)

    if (
      this.shouldCleanStorage ||
      (!this.shouldCleanStorage && !this.shouldCleanDist)
    ) {
      await this.cleanStorage()
    }

    if (
      this.shouldCleanDist ||
      (!this.shouldCleanDist && !this.shouldCleanDist)
    ) {
      await this.cleanDist()
    }
  }

  @bind
  public async cleanDist() {
    try {
      await remove(this.bud.path(`@dist`))

      BudCleanCommand.renderOnce(
        <Box>
          <Text color="green">✔ emptied {this.bud.path(`@dist`)}</Text>
        </Box>,
      )
    } catch (err) {
      this.context.stderr.write(err)
    }
  }

  @bind
  public async cleanStorage() {
    try {
      await ensureDir(this.bud.path(`@storage`))
      await remove(this.bud.path(`@storage`))
      BudCleanCommand.renderOnce(
        <Box>
          <Text color="green">✔ emptied {this.bud.path(`@storage`)}</Text>
        </Box>,
      )
    } catch (err) {
      BudCleanCommand.renderOnce(
        <Box>
          <Text>
            {err?.message ?? isString(err) ? err : JSON.stringify(err)}
          </Text>
        </Box>,
      )
    }
  }
}
