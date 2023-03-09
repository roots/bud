/* eslint-disable n/no-process-env */
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Release command
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
    if (this.registry === `http://localhost:4873`)
      await this.useLocalRegistry()

    if (!this.version) {
      const date = new Date()
      const utcSemver = `${date.getUTCFullYear()}.${
        date.getUTCMonth() + 1
      }.${date.getUTCDate()}`

      try {
        await this.$([
          `npm`,
          [
            `show`,
            `@roots/bud@${utcSemver}`,
            `--tag`,
            `${this.tag}`,
            `--registry`,
            `${this.registry}`,
          ],
          // @ts-ignore
          {stderr: `ignore`},
        ])

        this.version = `${utcSemver}-${date.getUTCHours()}${date.getUTCMinutes()}`
      } catch (e) {
        this.version = utcSemver
      }
    }
    await this.$([`yarn`, [`@bud`, `version`, this.version]])

    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )

    await this.$([`yarn`, [`@bud`, `version`, `0.0.0`]])
    await this.useNpmRegistry()
  }
}
