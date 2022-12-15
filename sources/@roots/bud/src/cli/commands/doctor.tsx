import BuildCommand from '@roots/bud/cli/commands/build.base'
import {checkDependencies} from '@roots/bud/cli/helpers/checkDependencies'
import {checkNoPackageManager} from '@roots/bud/cli/helpers/checkPackageManagerErrors'
import {detectPackageManager} from '@roots/bud/cli/helpers/detectPackageManager'
import {isNoPackageManager} from '@roots/bud/cli/helpers/isPackageManagerError'
import {Command} from '@roots/bud-support/clipanion'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import webpack from '@roots/bud-support/webpack'

/**
 * `bud doctor` command
 *
 * @public
 */
export default class DoctorCommand extends BuildCommand {
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

  public config: webpack.Configuration

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand() {
    const hasNoPackageManager = isNoPackageManager(this.app)

    if (hasNoPackageManager) {
      checkNoPackageManager(this.app)
    } else {
      this.renderOnce(
        <Box>
          <Text color="green">
            ✅ using {detectPackageManager(this.app)}
          </Text>
        </Box>,
      )
    }

    if (hasNoPackageManager) {
      this.renderOnce(
        <Box>
          <Text color="yellow">
            ⚠️ skipping dependency checks since package manager is
            indeterminate
          </Text>
        </Box>,
      )
    } else {
      const errors = await checkDependencies(this.app)
      if (!errors) {
        this.renderOnce(
          <Box>
            <Text color="green">✅ dependencies are valid</Text>
          </Box>,
        )
      }
    }

    try {
      this.config = await this.app.build.make()
      this.renderOnce(
        <Box>
          <Text color="green">✅ bud.js generated configuration</Text>
        </Box>,
      )
    } catch (error) {
      this.renderOnce(
        <Box>
          <Text color="red">❌ {error?.message ?? error}</Text>
        </Box>,
      )
    }

    try {
      webpack.validate(this.config)

      this.renderOnce(
        <Box>
          <Text color="green">✅ webpack validated configuration</Text>
        </Box>,
      )
    } catch (error) {
      this.renderOnce(
        <Box>
          <Text color="red">❌ {error?.message ?? error}</Text>
        </Box>,
      )
    }

    this.renderOnce(
      <Box flexDirection="column">
        <Text color="blue">Registered configurations</Text>
        {Object.values(this.app.context.config)
          .filter(({bud}) => bud)
          .map(({name, path}, i) => (
            <Box key={i}>
              <Text>- {name}</Text>
              <Text>{` `}</Text>
              <Text color="gray">
                {path.replace(this.app.context.basedir, `.`)}
              </Text>
            </Box>
          ))}
      </Box>,
    )
  }
}
