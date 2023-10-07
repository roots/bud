import BudCommand from '@roots/bud/cli/commands'
import {Command} from '@roots/bud-support/clipanion'
import {Box, Text} from '@roots/bud-support/ink'

/**
 * bud env command
 */
export default class ConfigCommand extends BudCommand {
  public static override paths = [[`config`]]

  public static override usage = Command.Usage({
    category: `debug`,
    description: `Check configuration files`,
    details: `\
      This command will output information about configuration files found in the project.
`,
    examples: [[`Check configuration files used by bud.js`, `$0 config`]],
  })

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const configs = Object.values(this.bud.context.files)

    if (!configs.length) {
      return ConfigCommand.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">
            {`\n`} Configuration files{`\n`}
          </Text>
          <Text dimColor>No configuration files found in project</Text>
        </Box>,
      )
    }

    ConfigCommand.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">
          {`\n`}Configuration files{`\n`}
        </Text>
        {configs.map(({bud, path}, i) => (
          <Box key={i}>
            <Text dimColor>
              {path.replace(this.bud.context.basedir, `.`)}
            </Text>
            {bud && <Text>{` (bud config)`}</Text>}
          </Box>
        ))}
      </Box>,
    )
  }
}
