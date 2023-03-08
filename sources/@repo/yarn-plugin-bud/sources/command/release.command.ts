/* eslint-disable n/no-process-env */
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Release command
 *
 * @internal
 */
export class Release extends Command {
  /**
   * Command name
   */
  public static label = `@bud release`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `release`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Do a release.`,
    examples: [
      [
        `Bump packages to x.y.z and publish`,
        `yarn @bud release --version x.y.z --tag latest`,
      ],
    ],
  }

  /**
   * --tag
   */
  public tag = Option.String(`-t,--tag`, {
    description: `Release tag`,
    required: true,
  })

  /**
   * --version
   */
  public version = Option.String(`-v,--version`, {
    description: `Release version`,
    required: false,
  })

  /**
   * --registry
   */
  public registry = Option.String(
    `-r,--registry`,
    `http://localhost:4873`,
    {
      description: `Release registry`,
    },
  )

  /**
   * Execute command
   */
  public async execute() {
    this.log(
      `Publishing packages\n\nInitial env:\n\nci: ${process.env.CI}\n--registry: ${this.registry}\n--tag: ${this.tag}\n--version: ${this.version}\n\n`,
    )

    await this.$(`yarn install --immutable`)

    if (this.registry === `http://localhost:4873`) {
      await this.cli.run([`@bud`, `registry`, `start`])
    }

    await this.cli.run([`@bud`, `tsc`, `--force`])

    if (!this.version) {
      const date = new Date()
      const utcSemver = `${date.getUTCFullYear()}.${
        date.getUTCMonth() + 1
      }.${date.getUTCDate()}`

      try {
        await this.$(
          `npm show @roots/bud@${utcSemver} --tag ${this.tag} --registry ${this.registry}`,
        )

        this.version = `${utcSemver}-${date.getUTCHours()}${date.getUTCMinutes()}`
      } catch (e) {
        this.version = utcSemver
      }
    }

    await this.cli.run([`@bud`, `version`, this.version])

    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )

    if (this.registry === `http://localhost:4873`) {
      await this.$([`yarn`, [`@bud`, `version`, `0.0.0`]])
      await this.$([`yarn`, [`@bud`, `registry`, `stop`]])
      await this.$(`yarn`)
    }
  }
}
