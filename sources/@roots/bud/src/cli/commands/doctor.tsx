import {Command} from 'clipanion'
import {bind} from 'helpful-decorators'
import {Box, Text} from 'ink'
import React from 'react'
import webpack from 'webpack'

import {BaseCommand} from './base.js'

/**
 * `bud doctor` command
 *
 * @public
 */
export class DoctorCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`doctor`]]

  /**
   * Set CI to true
   */
  public dry = true

  /**
   * Command usage
   *
   * @public
   */
  public static usage = Command.Usage({
    description: `Check compiled configuration against webpack`,
    examples: [
      [`Check compiled configuration against webpack`, `$0 doctor`],
    ],
  })

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.renderOnce(
      <Box marginBottom={1}>
        <Text>Checking configuration...</Text>
      </Box>,
    )
    await this.checkConfiguration()

    this.renderOnce(
      <Box marginY={1}>
        <Text>Checking dependencies...</Text>
      </Box>,
    )
    await this.checkDependencies()
  }

  @bind
  public async checkConfiguration() {
    const conf = this.app.build.config

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

      this.app.error(error)
    }
  }

  @bind
  public async checkDependencies() {
    const mismatches = Object.entries({
      ...(this.app.context.manifest.dependencies ?? {}),
      ...(this.app.context.manifest.devDependencies ?? {}),
    })
      .filter(([name]) => name.startsWith(`@roots/`))
      .filter(([k, v]) => v !== this.app.context.bud.version)

    if (!mismatches?.length) {
      this.renderOnce(
        <Box>
          <Text color="green">
            ✅ all dependencies set to {this.app.context.bud.version}
          </Text>
        </Box>,
      )
    }
    mismatches.map(([k, v]: [string, string]) => {
      this.renderOnce(
        <Box>
          <Text color="red">version mismatch</Text>
          <Box flexDirection="column" paddingLeft={1} paddingBottom={1}>
            <Text>
              bud is on{` `}
              <Text color="blue">{this.app.context.bud.version}</Text> but
              {` `}
              {k}
              {` `}
              is on <Text color="blue">{v}</Text>
            </Text>
          </Box>
        </Box>,
      )
    })
  }
}
