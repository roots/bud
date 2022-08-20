import chalk from 'chalk'
import {Command, Option} from 'clipanion'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'
import {Box, Text} from 'ink'
import React from 'react'

import {factory} from '../../factory/index.js'
import * as disk from '../config/disk.config.js'
import {BaseCommand} from './base.js'

const {ensureDir, remove} = fs

export class CleanCommand extends BaseCommand {
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

  @bind
  public async runCommand() {
    try {
      this.app = await factory({
        args: {
          ci: true,
        },
      })
    } catch (e) {
      this.app.error(`error constructing app`)
    }

    try {
      await disk.config(this.app)
    } catch (error) {
      this.app.error(error)
    }

    try {
      await this.app.compiler.before()
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
