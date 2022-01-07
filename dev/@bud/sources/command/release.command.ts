import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Release extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `release`],
  ]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run release`,
    examples: [
      [
        `yarn @bud release --version x.y.z --tag latest --token <token> --registry https://registry.npmjs.org`,
        `Bump packages to x.y.z and publish to npm.`,
      ],
      [
        `yarn @bud release --version x.y.z --tag latest`,
        `Bump packages to x.y.z and publish to local verdaccio server`,
      ],
    ],
  }

  public npmRegistryServer = Option.String(
    `--registry,-r`,
    `//verdaccio:4873`,
    {
      description: 'registry',
    },
  )
  public token = Option.String('-t,--token', null, {
    description: 'token',
  })
  public version = Option.String(`-v,--version`, null, {
    description: `version`,
  })
  public tag = Option.String(`-t,--tag`, `dev`, {
    description: `tag`,
  })

  /**
   * current version
   *
   * @internal
   */
  public currentVersion = null

  /**
   * yarn config store
   *
   * @internal
   */
  public configStash = {
    npmPublishAccess: null,
    npmRegistryServer: null,
    unsafeHttpWhitelist: null,
    npmAuthIdent: null,
    npmAuthToken: null,
  }

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
    try {
      await this.preflight()

      await this.bump()

      await this.make()

      await this.publish()

      if (this.tag === 'latest') await this.push()
      if (this.tag === 'next') await this.restoreBranch()

      await this.restoreConfig()
    } catch (error) {
      await this.restoreConfig()
      throw error
    }
  }

  /**
   * Save yarn config values to stash
   *
   * @remarks
   * The stash will be restored at the end of the command or
   * if an error occurs.
   *
   * @internal
   */
  public async preflight() {
    /** True if release is local dev proxy release */
    const isProxyRelease =
      this.npmRegistryServer === '//verdaccio:4873'

    /** Checks */
    if (!this.version) throw new Error(`--version is required`)
    if (!isProxyRelease && !this.token)
      throw new Error(`--token is required for an npm release`)

    /** Set auth for local proxy release */
    const authVerdaccio = async () => {
      await this.$(
        `yarn config set unsafeHttpWhitelist --json '["verdaccio"]'`,
      )
      await this.$(`yarn config set npmAuthIdent test:test`)
      await this.$(
        `yarn npm-auth-to-token -u test -p test -e -test@test.com -r ${this.npmRegistryServer}`,
      )
    }

    /** Set auth for npm release */
    const authNpm = async () => {
      await this.$(`yarn config set npmAuthToken ${this.token}`)
    }

    /** Stash original config values (to be restored later) */
    await Promise.all(
      Object.keys(this.configStash).map(async key => {
        this.configStash[key] = await this.$(
          `yarn config get ${key}`,
        )
      }),
    )

    /** Set config values for purposes of release */
    await this.$(`yarn config set npmPublishAccess public`)
    await this.$(
      `yarn config set npmRegistryServer ${this.npmRegistryServer}`,
    )

    this.npmRegistryServer === '//verdaccio:4873'
      ? await authVerdaccio()
      : await authNpm()
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
   */
  public async make() {
    await this.$(`yarn @bud clean`)
    await this.$(`yarn @bud make`)
  }

  /**
   * npm publish
   *
   * @remarks
   * The code is committed, the tag is pushed, and the
   * packages are published. Pay attention to the npm tag here.
   * If this is a next version, then be sure to add the next
   * tag instead of latest.
   */
  public async publish() {
    await this.$(
      `git commit -am 'chore: Bump @roots/bud to v${this.version}`,
    )
    await this.$(`git tag v${this.version}`)
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )
    await this.$(`git push --tags`)
  }

  /**
   * git push
   *
   * @remarks
   * If this is a latest build, then push the branch and open a PR.
   *
   * @internal
   */
  public async push() {
    await this.$(`git push -u origin v${this.version}`)
  }

  /**
   * git branch -D
   *
   * @remarks
   * If this is a next build, then don’t push it. Just delete the branch.
   *
   * @internal
   */
  public async restoreBranch() {
    await this.$(`git checkout next`)
    await this.$(`git branch -D v${this.version}`)
  }

  /**
   * Restore yarn config values from stash
   *
   * @internal
   */
  public async restoreConfig() {
    await this.$(
      ...Object.entries(this.configStash).reduce(
        (acc, [key, value]) => [
          ...acc,
          `yarn config set ${key} ${value}`,
        ],
        [],
      ),
    )
  }
}
