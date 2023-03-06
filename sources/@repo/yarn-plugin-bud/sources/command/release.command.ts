/* eslint-disable n/no-process-env */
import {REPO_PATH} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {emptyDir, readJson, writeJson} from 'fs-extra'
import {parse} from 'semver'

import {Command} from './base.command'

/**
 * Execution steps
 *
 * @internal
 */
export type EXECUTION_STEPS = 'preflight' | 'bump' | 'make' | 'publish'

/**
 * Release command
 *
 * @internal
 */
export class Release extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud release`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `release`]]

  /**
   * Command usage
   *
   * @internal
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
   * --version flag
   *
   * @internal
   */
  public version = Option.String(`-v,--version`, null, {
    description: `version`,
  })

  /**
   * --tag flag
   *
   * @internal
   */
  public tag = Option.String(`-t,--tag`, null, {
    description: `release tag (latest, nightly, etc.)`,
  })

  public registry = Option.String(
    `-r,--registry`,
    process.env.CI
      ? `https://registry.npmjs.org/`
      : `http://localhost:4873`,
    {
      description: `Registry to publish to. Defaults to npm in CI.`,
    },
  )

  public async execute() {
    await this.$(`yarn install --immutable`)

    if (!process.env.CI) {
      try {
        await this.$(`yarn @bud registry start`)
      } catch {}
    }

    if (!process.env.CI && !this.version) {
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
      `yarn workspaces foreach --no-private npm publish --access public --tag ${
        this.tag ?? `latest`
      }`,
    )
    
    if (!process.env.CI) {
      await this.$(`yarn @bud version 0.0.0`)
      await this.$(`yarn @bud registry stop`)
      await this.$(`yarn`)
      await this.$(`yarn @bud registry start`)
    }
  }
}
