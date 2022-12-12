import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import webpack from '@roots/bud-support/webpack'

import {checkDependencies} from '../helpers/checkDependencies.js'
import BaseCommand from './base.js'

/**
 * `bud doctor` command
 *
 * @public
 */
export default class DoctorCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [[`doctor`]]

  /**
   * Command usage
   *
   * @public
   */
  public static override usage = Command.Usage({
    description: `Check project for common errors`,
    details: `\
The \`bud doctor\` command will:

1. validate the \`production\` configuration with \`webpack\`

\`webpack\` exports a \`validate\` function which is used by this command to verify that
the configuration matches the \`webpack\` configuration schema.

2. check the \`dependencies\` and \`devDependencies\` in the \`package.json\` file.

In general, \`bud.js\` dependencies should be kept at the same version. This script doesn't account
for a lot of edge cases so it might return a false positive.
`,
    examples: [
      [`Check compiled configuration against webpack`, `$0 doctor`],
    ],
  })

  /**
   * Args
   * @public
   */
  public override get args() {
    return {...this.context.args, dry: true}
  }

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand() {
    await this.checkConfiguration()

    this.renderOnce(
      <Box marginY={1}>
        <Text>Checking dependencies...</Text>
      </Box>,
    )

    const errors = await checkDependencies(this.app)
    if (!errors) {
      this.renderOnce(
        <Box>
          <Text color="green">✅ dependencies synced</Text>
        </Box>,
      )
    }
  }

  @bind
  public async checkConfiguration() {
    this.renderOnce(
      <Box marginBottom={1}>
        <Text>Checking configuration...</Text>
      </Box>,
    )

    const conf = this.app.build.make()

    if (!conf) {
      return this.renderOnce(
        <Box>
          <Text color="red">config not returned from bud compiler</Text>
        </Box>,
      )
    }

    try {
      webpack.validate(conf)

      this.renderOnce(
        <Box>
          <Text color="green">✅ configuration is valid</Text>
        </Box>,
      )
    } catch (error) {
      this.renderOnce(
        <Box>
          <Text color="red">configuration is invalid</Text>
          <Text>{error?.message ?? error}</Text>
        </Box>,
      )
    }
  }
}
