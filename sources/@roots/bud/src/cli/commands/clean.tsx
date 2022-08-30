import chalk from 'chalk'
import {Command, Option} from 'clipanion'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {Box, Text} from 'ink'
import React from 'react'

import BaseCommand from './base.js'

const {ensureDir, remove} = fs

export default class CleanCommand extends BaseCommand {
  public static paths = [[`clean`]]

  public static usage = Command.Usage({
    description: `Clean project artifacts and caches`,
    examples: [[`Clean artifacts/caches`, `$0 clean`]],
  })

  public storage = Option.Boolean(`@storage`, false, {
    description: `empty @storage`,
  })

  public dist = Option.Boolean(`@dist`, false, {
    description: `empty @dist`,
  })

  /**
   * Set CI to true
   */
  public dry = true

  public get args() {
    return {...this.context.args, dry: true}
  }

  @bind
  public async runCommand() {
    try {
      await this.app.run()
    } catch (e) {}

    if (this.storage || (!this.storage && !this.dist)) {
      await this.cleanStorage()
    }
    if (this.dist || (!this.storage && !this.dist)) {
      await this.cleanDist()
    }
  }

  @bind
  public async cleanDist() {
    try {
      await remove(this.app.path(`@dist`))

      this.renderOnce(
        <Box>
          <Text color="green">✔ emptied {this.app.path(`@dist`)}</Text>
        </Box>,
      )
    } catch (err) {
      this.context.stderr.write(chalk.red(err))
    }
  }

  @bind
  public async cleanStorage() {
    try {
      await ensureDir(this.app.path(`@storage`))
      await remove(this.app.path(`@storage`))

      this.renderOnce(
        <Box>
          <Text color="green">✔ emptied {this.app.path(`@storage`)}</Text>
        </Box>,
      )
    } catch (err) {
      this.context.stderr.write(chalk.red(err))
    }
  }
}
