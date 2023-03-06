/* eslint-disable n/no-process-env */
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Execution steps
 */
export type EXECUTION_STEPS = 'preflight' | 'bump' | 'make' | 'publish'

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
    description: `Cut a release.`,
    examples: [
      [
        `Bump packages to x.y.z and publish`,
        `yarn @bud release --version x.y.z --tag latest`,
      ],
    ],
  }

  /**
   * --version flag
   */
  public version = Option.String(`-v,--version`, null, {
    description: `version`,
  })

  /**
   * --tag flag
   */
  public tag = Option.String(`-t,--tag`, null, {
    description: `release tag (latest, nightly, etc.)`,
  })

  /**
   * --registry flag
   */
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
    /**
     * Install everything
     */
    await this.$(`yarn install --immutable`)

    /**
     * For local dev we want to publish to the local registry
     * so we'll make sure it's running
     */
    if (!process.env.CI) {
      try {
        await this.$(`yarn @bud registry start`)
      } catch {}
    }

    /**
     * If no version specified, generate one
     */
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

    /**
     * If there is still no version there is a problem
     */
    if (!this.version) {
      throw new Error(`Unable to determine version`)
    }

    /** Version all packages */
    await this.$(`yarn @bud version ${this.version}`)
    /** Build one last time */
    await this.$(`yarn @bud build --force`)
    /** Publish all packages */
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${
        this.tag ?? `latest`
      }`,
    )
  
    /**
     * For local dev reset all the package versions and 
     * make sure .yarnrc.yml doesn't get messed up
     */
    if (!process.env.CI) {
      await this.$(`yarn @bud version 0.0.0`)
      await this.$(`yarn @bud registry stop`)
      await this.$(`yarn`)
      await this.$(`yarn @bud registry start`)
    }
  }
}
