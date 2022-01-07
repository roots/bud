import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Release extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `release`],
  ]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `do a release. if no registry is passed the proxy registry will be used (localhost:4873). if no token is passed, the env NPM_AUTH_TOKEN will be used.`,
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
    try {
      /**
       * Check that nothing is obviously rekt
       */
      await this.preflight()

      /**
       * Bump version across all public packages
       */
      await this.bump()

      /**
       * Remake packages and build documentation
       */
      await this.make()

      /**
       * Push tags or branch to github
       */
      await this.push()

      /**
       * Publish to npm or verdaccio
       */
      await this.publish()
    } catch (error) {
      throw error
    }
  }

  /**
   * Preflight
   *
   * @internal
   */
  public async preflight() {
    /** check version */
    if (!this.version) throw new Error(`--version is required`)

    /** for a proxy release we're done */
    if (this.isProxyRelease()) return

    /** real deal release checks */
    if (
      this.npmRegistryServer !== 'https://registry.npmjs.org'
    ) {
      throw new Error(
        `--registry must be https://registry.npmjs.org to publish an npm release`,
      )
    }

    /** check token */
    if (!this.token)
      throw new Error(`--token is required to release on npm`)

    /** check tag */
    if (this.tag !== 'latest' && this.tag !== 'next') {
      throw new Error(
        `--tag must be 'latest' or 'next' to release on npm`,
      )
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
    /* Don't push anything for a proxy release */
    if (this.isProxyRelease()) return

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
   * The packages are published. Pay attention to the npm tag here.
   * If this is a next version, then be sure to add the next
   * tag instead of latest.
   *
   * @internal
   */
  public async publish() {
    /* Set target registry */
    await this.$(
      `yarn config set npmRegistryServer ${this.npmRegistryServer}`,
    )

    /* Auth */
    if (this.isProxyRelease()) {
      await this.$(
        `yarn config set unsafeHttpWhitelist --json '["verdaccio"]'`,
      )
      await this.$(`yarn config set npmAuthIdent test:test`)
    } else {
      await this.$(
        `yarn config set unsafeHttpWhitelist --json '[]'`,
      )
      await this.$(`yarn config set npmAuthToken ${this.token}`)
    }

    /* Publish release */
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )

    /* Restore npmRegistryServer */
    await this.$(
      `yarn config set npmRegistryServer //verdaccio:4873`,
    )
    /* Restore unsafeHttpWhitelist */
    await this.$(
      `yarn config set unsafeHttpWhitelist --json '["verdaccio"]'`,
    )
    /* Restore npmAuthIdent */
    await this.$(`yarn config set npmAuthIdent 'test:test'`)
    /* Restore npmAuthToken */
    await this.$(`yarn config set npmAuthToken ''`)
  }

  /**
   * Returns true if releasing to a local verdaccio server
   *
   * @internal
   */
  public isProxyRelease() {
    return this.npmRegistryServer === '//verdaccio:4873'
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
