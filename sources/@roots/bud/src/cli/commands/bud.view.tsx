import {Command, Option} from '@roots/bud-support/clipanion'
import {highlight} from '@roots/bud-support/highlight'
import {Box, Text} from '@roots/bud-support/ink'
import get from '@roots/bud-support/lodash/get'
import format from '@roots/bud-support/pretty-format'
import BudCommand from '@roots/bud/cli/commands/bud'
import indent from '@roots/bud/cli/flags/indent'

/**
 * `bud view` command
 */
export default class BudViewCommand extends BudCommand {
  public static override paths = [[`view`]]

  public static override usage = Command.Usage({
    category: `debug`,
    description: `Explore bud object`,
    examples: [[`view compiled config`, `$0 view build.config`]],
  })

  public indent = indent

  public subject = Option.String({name: `subject`, required: false})

  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    let value = this.subject ? get(this.bud, this.subject) : this.bud
    let indent = 0

    switch (this.indent) {
      case undefined:
        indent = 2
        break

      default:
        indent = parseInt(this.indent)
    }

    value = format(this.subject ? get(this.bud, this.subject) : this.bud, {
      indent,
    })

    if (this.color) value = highlight(value)

    BudViewCommand.renderStatic(
      <Box flexDirection="column">
        <Text color="magenta">{this.subject ?? `build.config`}</Text>
        <Text>{` `}</Text>
        <Text>{value}</Text>
      </Box>,
    )
  }
}
