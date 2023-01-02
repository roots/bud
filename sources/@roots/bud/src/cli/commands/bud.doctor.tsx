import BudCommand from '@roots/bud/cli/commands/bud'
import type {CommandContext} from '@roots/bud-framework/options'
import {Command} from '@roots/bud-support/clipanion'
import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import webpack from '@roots/bud-support/webpack'

import {dry} from '../decorators/command.dry.js'

/**
 * `bud doctor` command
 *
 * @public
 * @decorator `@dry`
 */
@dry
export default class BudDoctorCommand extends BudCommand {
  public static override paths = [[`doctor`]]
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
  public override withArguments = async (args: CommandContext[`args`]) => {
    return {...args, dry: true}
  }

  public configuration: webpack.Configuration

  /**
   * Execute command
   *
   * @public
   * @decorator `@bind`
   */
  public override async execute() {
    await this.makeBud(this)
    await this.run(this)

    try {
      this.configuration = await this.bud.build.make()
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="green">
            ✅ bud.js generated configuration
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="red">❌ {error?.message ?? error}</Ink.Text>
        </Ink.Box>,
      )
    }

    try {
      webpack.validate(this.configuration)

      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="green">
            ✅ webpack validated configuration
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="red">❌ {error?.message ?? error}</Ink.Text>
        </Ink.Box>,
      )
    }

    await this.renderOnce(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">Registered configurations</Ink.Text>
        {Object.values(this.bud.context.config)
          .filter(({bud}) => bud)
          .map(({name, path}, i) => (
            <Ink.Box key={i}>
              <Ink.Text>- {name}</Ink.Text>
              <Ink.Text>{` `}</Ink.Text>
              <Ink.Text color="gray">
                {path.replace(this.bud.context.basedir, `.`)}
              </Ink.Text>
            </Ink.Box>
          ))}
      </Ink.Box>,
    )
  }
}
