import {highlight} from '@roots/bud-support/cli-highlight'
import {Command, Option} from '@roots/bud-support/clipanion'
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
  public static paths = [[`view`]]

  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    description: `Explore bud object`,
    examples: [
      [`view compiled config`, `$0 view`],
      [`view`, `$0 view env store`],
    ],
  })

  public dry = true

  public notify = false

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
  public async runCommand() {
    await this.app.build.make()

    let value = this.subject ? get(this.app, this.subject) : this.app

    value = format(this.subject ? get(this.app, this.subject) : this.app, {
      indent: parseInt(
        this.indent === undefined
          ? `2`
          : this.indent === true
          ? `2`
          : this.indent === false
          ? `0`
          : this.indent,
      ),
    })

    if (this.color) value = highlight(value, {ignoreIllegals: true})

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
