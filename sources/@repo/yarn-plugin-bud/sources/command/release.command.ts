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
    process.env.CI
      ? `https://registry.npmjs.org/`
      : `http://localhost:4873`,
    {
      description: `Release registry`,
    },
  )

  public async execute() {
    await this.$(`yarn install --immutable`)

    if (!process.env.CI) {
      try {
        await this.$(`yarn @bud registry start`)
      } catch {}
    }

    if (this.tag !== `latest` && !this.version) {
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

    if (this.version) {
      await this.$(`yarn @bud version ${this.version}`)
    }

    await this.$(`yarn @bud build --force`)
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )

    if (!process.env.CI) {
      await this.$(`yarn @bud version 0.0.0`)
      await this.$(`yarn @bud registry stop`)
      await this.$(`yarn`)
      await this.$(`yarn @bud registry start`)
    }
  }
}
