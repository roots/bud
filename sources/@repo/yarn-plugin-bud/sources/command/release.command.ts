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
  public static label = '@bud release'

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

  /**
   * Returns true if tagged `latest`
   *
   * @internal
   */
  public isTaggedLatest() {
    return this.tag === 'latest'
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
    await this.executeStep(`preflight`)
    await this.executeStep(`bump`)
    await this.executeStep(`make`)
    await this.executeStep(`publish`)
  }

  /**
   * Execute a step
   *
   * @remarks
   * This is a helper function to execute a step.
   * It will throw an error and reset yarnrc state if the step fails.
   *
   * @param step - the step to execute
   *
   * @internal
   */
  public async executeStep(step: EXECUTION_STEPS) {
    try {
      if (!this[step]) throw new Error(`${step} is not implemented`)

      await this[`${step}`]()
    } catch (error) {
      this.err(`${step} failed: ${error.message}\n`)
      this.err(error.stack)
      process.exit(1)
    }
  }

  /**
   * Check tag validity
   *
   * @internal
   */
  public async checkTagIsValid() {
    if (!this.tag) {
      const [prerelease] = parse(this.version).prerelease
      this.tag = `${prerelease ?? 'latest'}`
    }

    if (this.tag !== 'latest' && this.tag !== 'next') {
      throw new Error(`--tag [${this.tag}] must be 'latest' or 'next'`)
    }
  }

  /**
   * Wipe proxied packages
   *
   * @internal
   */
  public async wipeProxyDb() {
    try {
      this.log('Wiping previously published packages')

      const verdaccioDb = await readJson(
        `${REPO_PATH}/storage/.verdaccio-db.json`,
      )
      verdaccioDb.list = []
      await writeJson(
        `${REPO_PATH}/storage/.verdaccio-db.json`,
        verdaccioDb,
      )
      await emptyDir(`${REPO_PATH}/storage/packages/@roots`)
    } catch (e) {
      this.log('db/previously published packages could not be wiped.')
    }
  }

  /**
   * Preflight
   *
   * @internal
   */
  public async preflight() {
    await this.wipeProxyDb()

    this.log('Installing')

    await this.$(`yarn install --immutable`)

    await this.checkTagIsValid()
  }

  /**
   * npm version
   *
   * @internal
   */
  public async bump() {
    if (this.version) {
      await this.$(`yarn @bud version ${this.version}`)
    }
  }

  /**
   * Build packages
   *
   * @internal
   */
  public async make() {
    await this.$(`yarn @bud build`)
  }

  /**
   * Publish release
   *
   * @remarks
   * Publishes release to registry
   *
   * @internal
   */
  public async publish() {
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )
  }
}
