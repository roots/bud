import BudCommand from '@roots/bud/cli/commands'
import {Command} from '@roots/bud-support/clipanion'
import {Box, Text} from '@roots/bud-support/ink'

/**
 * bud env command
 */
export default class EnvCommand extends BudCommand {
  public static override paths = [[`env`]]

  public static override usage = Command.Usage({
    category: `debug`,
    description: `Check environment values`,
    details: `\
      This command will output the values of the environment variables as processed by bud.js.
      You can use this to check that your values are being set correctly.
`,
    examples: [[`Check environment values set by bud.js`, `$0 env`]],
  })

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    EnvCommand.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">{`\n`}Environment variables{`\n`}</Text>

        {this.bud.env
          .getEntries()
          .sort((a, b) =>
            a[0].toLowerCase().localeCompare(b[0].toLowerCase()),
          )
          .map(([key, value]) => {
            return (
              <Box flexDirection="row" key={key}>
                <Text>
                  {key}={`${value}`}
                </Text>
              </Box>
            )
          })}
      </Box>,
    )
  }
}
