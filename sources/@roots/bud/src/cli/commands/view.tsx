import {Command, Option} from '@roots/bud-support/clipanion'
import {highlight} from '@roots/bud-support/highlight'
import {Box, Static, Text} from '@roots/bud-support/ink'
import {get} from '@roots/bud-support/lodash-es'
import format from '@roots/bud-support/pretty-format'
import React, {Fragment} from '@roots/bud-support/react'

import BaseCommand from './base.js'

/**
 * `bud view` command
 *
 * @public
 */
export default class ViewCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static override paths = [[`view`]]

  /**
   * Command usage
   * @public
   */
  public static override usage = Command.Usage({
    description: `Explore bud object`,
    examples: [
      [`view compiled config`, `$0 view`],
      [`view`, `$0 view env store`],
    ],
  })

  public color = Option.Boolean(`--color,-c`, true, {
    description: `use syntax highlighting`,
  })

  public indent = Option.String(`--indent,-i`, `2`, {
    description: `indentation level`,
    tolerateBoolean: true,
  })

  public subject = Option.String({name: `subject`, required: false})

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand() {
    await this.app.build.make()

    let value = this.subject ? get(this.app, this.subject) : this.app
    let indent = 0

    switch (this.indent) {
      case true:
        indent = 2
        break

      case false:
        indent = 0
        break

      case undefined:
        indent = 2
        break

      default:
        indent = parseInt(this.indent)
    }

    value = format(this.subject ? get(this.app, this.subject) : this.app, {
      indent,
    })

    if (this.color) value = highlight(value)

    await this.renderOnce(
      <Box marginBottom={1}>
        <Static items={[0]}>
          {id => (
            <Fragment key={id}>
              <Text color="magenta">{this.subject ?? `build.config`}</Text>
              <Text>{` `}</Text>
              <Text key={id}>{value}</Text>
            </Fragment>
          )}
        </Static>
      </Box>,
    )
  }
}
