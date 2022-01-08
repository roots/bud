import {CommandClass, Option} from 'clipanion'
import {REGISTRY_NPM} from '../constants'

import {Command} from './base.command'

type EXECUTION_STEPS =
  | 'preflight'
  | 'bump'
  | 'make'
  | 'push'
  | 'prepublish'
  | 'publish'
  | 'postpublish'

export class Release extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `release`],
  ]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `do a release. if no token is passed, the env NPM_AUTH_TOKEN will be used.`,
    examples: [
      [
        `yarn @bud release --version x.y.z --tag latest --token <token>`,
        `Bump packages to x.y.z and publish to npm.`,
      ],
    ],
  }

  public token = Option.String(
    '-t,--token',
    process.env.NPM_AUTH_TOKEN,
    {
      description: 'token',
    },
  )

  public version = Option.String(`-v,--version`, null, {
    description: `version`,
  })

  public tag = Option.String(`-t,--tag`, `dev`, {
    description: `tag`,
  })

  /**
   * execute command
   *
   * @remarks
   * You must be in the roots staff channel to see this link. It is
   * just a broader overview of the steps.
   * {@link https://discourse.roots.io/t/bump-bud-version/21988}
   *
   * @internal
   */
  public async execute() {
    await this.executeStep(`preflight`)
    await this.executeStep(`bump`)
    await this.executeStep(`make`)
    await this.executeStep(`push`)
    await this.executeStep(`prepublish`)
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
      if (!this[step])
        throw new Error(`${step} is not implemented`)

      await this[`${step}`]()
    } catch (error) {
      process.stderr.write(`${step} failed: ${error.message}\n`)
      process.stderr.write(`${error.stack}\n\n`)

      process.stderr.write(`Resettting yarnrc state\n`)
      await this.$(`yarn config set 'npmAuthToken' ''`)

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

    if (!this.token)
      throw new Error(
        `--token flag or NPM_AUTH_TOKEN env variable is required`,
      )

    if (this.tag !== 'latest' && this.tag !== 'next') {
      throw new Error(`--tag must be 'latest' or 'next'`)
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
    await this.$(`yarn @bud clean`)
    await this.$(`git checkout -b v${this.version}`)
    await this.$(`yarn install --immutable`)
    await this.$(
      `yarn workspaces foreach --no-private exec npm version ${this.version}`,
    )
  }

  /**
   * make
   *
   * @remarks
   * I wipe everything again to ensure that any potential
   * post-install scripts that might grab the version are
   * being run properly.
   *
   * This will also run all tests and generate all docs.
   *
   * @internal
   */
  public async make() {
    await this.$(`yarn @bud clean`)
    await this.$(`yarn @bud make`)
  }

  /**
   * npm publish
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
   * npm prepublish
   *
   * @remarks
   * Set the registry to npm.
   *
   * @internal
   */
  public async prepublish() {
    await this.$(
      `yarn config set npmRegistryServer ${REGISTRY_NPM}`,
    )
    await this.$(
      `yarn config set npmPublishRegistry ${REGISTRY_NPM}`,
    )
    await this.$(
      `yarn config set unsafeHttpWhitelist --json '[]'`,
    )
    await this.$(
      `yarn config set 'npmAuthToken' "${this.token}"`,
    )
  }

  /**
   * npm publish
   *
   * @remarks
   * The packages are published. Pay attention to the npm tag here.
   * If this is a next version, then be sure to add the next
   * tag instead of latest.
   *
   * @internal
   */
  public async publish() {
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )
  }

  /**
   * Returns true if tagged `latest`
   *
   * @internal
   */
  public isTaggedLatest() {
    return this.tag === 'latest'
  }
}
