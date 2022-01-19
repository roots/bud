import {CommandClass, Option} from 'clipanion'
import {parse} from 'semver'

import {Command} from '../base.command'

export type EXECUTION_STEPS =
  | 'preflight'
  | 'bump'
  | 'make'
  | 'push'
  | 'prepublish'
  | 'publish'
  | 'postpublish'

/**
 * Release command
 *
 * @internal
 */
export class ReleaseNpm extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'release npm'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `release`, `npm`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `do an npm release. if no token is passed, the env NPM_AUTH_TOKEN will be used.`,
    examples: [
      [
        `yarn @bud release npm --version x.y.z --tag latest`,
        `Bump packages to x.y.z and publish to npm.`,
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
   * execute command
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
    await this.executeStep(`push`)
    await this.executeStep(`prepublish`)
    await this.executeStep('postpublish')
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
   * Preflight
   *
   * @internal
   */
  public async preflight() {
    if (!this.version) {
      const {version} = await this.getManifest()
      this.version = version
    }

    await this.checkTagIsValid()
  }

  /**
   * Check tag validity
   *
   * @internal
   */
  public async checkTagIsValid() {
    if (!this.tag) {
      const [prerelease, iteration] = parse(this.version).prerelease
      this.tag = `${prerelease ?? 'latest'}`
    }

    if (this.tag !== 'latest' && this.tag !== 'next') {
      throw new Error(`--tag [${this.tag}] must be 'latest' or 'next'`)
    }
  }

  /**
   * npm version
   *
   * @remarks
   * First I wipe everything, then install dependencies,
   * and update the version in all public packages.
   *
   * @internal
   */
  public async bump() {
    await this.$(`git checkout -b v${this.version}`)
    await this.$(`yarn install --immutable`)
    await this.$(`yarn @bud version ${this.version}`)
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
   * push
   *
   * @remarks
   * The code is committed, the tag is pushed.
   *
   * @internal
   */
  public async push() {
    /* Commit, tag and push tags */
    await this.$(
      `git commit -am 'chore: Bump @roots/bud to v${this.version}`,
    )

    await this.$(`git tag v${this.version}`)
    await this.$(`git push --tags`)

    /* If tagged latest push branch */
    this.isTaggedLatest() &&
      (await this.$(`git push -u origin v${this.version}`))
  }

  /**
   * npm publish
   *
   * @remarks
   * publishes release to npm
   *
   * @internal
   */
  public async publish() {
    await this.$(`yarn @bud publish --tag ${this.tag}`)
  }
}
