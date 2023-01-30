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
    description: `tag`,
  })

  public _registry = Option.String(`-r,--registry`, null, {
    description: `Registry to publish to. Defaults to npm in CI.`,
  })
  public get registry() {
    // eslint-disable-next-line n/no-process-env
    return this._registry ?? `https://registry.npmjs.org/`
  }

  /**
   * Execute command
   *
   * @remarks
   * You must be in the roots staff channel to see this link. It is
   * just a broader overview of the steps.
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn install --immutable`)

    if (this.tag === `nightly`) {
      const date = new Date()
      const utcSemver = `${date.getUTCFullYear()}.${date.getUTCMonth() + 1}.${date.getUTCDate()}`
      try {
        // eslint-disable-next-line n/no-process-env
        await this.$(`npm show @roots/bud@${utcSemver} --tag nightly --registry ${this.registry}`)
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
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag ?? `latest`}`,
    )
  }
}
