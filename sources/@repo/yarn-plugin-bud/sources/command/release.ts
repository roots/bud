import {CommandClass, Option} from 'clipanion'
import {noop} from 'lodash'

import {Command} from './base.command'

export class Release extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `release`]]

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

  public registry = Option.String(
    `-r,--registry`,
    `http://localhost:4873`,
    {description: `Release registry`},
  )

  public tag = Option.String(`-t,--tag`, {
    description: `Release tag`,
    required: true,
  })

  public version = Option.String(`-v,--version`, {
    description: `Release version`,
    required: false,
  })

  public constructor() {
    super()
    this.catch = this.catch.bind(this)
    this.resetRegistry = this.resetRegistry.bind(this)
  }

  public override async catch() {
    await this.resetRegistry()
  }

  public async execute() {
    if (this.registry.startsWith(`http://localhost:4873`)) {
      await this.cli
        .run([
          `config`,
          `set`,
          `npmPublishRegistry`,
          `http://localhost:4873`,
        ])
        .then(this.throwIfError)
        .catch(this.catch)

      await this.cli
        .run([
          `config`,
          `set`,
          `npmRegistryServer`,
          `http://localhost:4873`,
        ])
        .then(this.throwIfError)
        .catch(this.catch)
    }

    if (!this.version) {
      this.version = this.makeVersion()
    }

    await this.cli
      .run([`@bud`, `version`, this.version])
      .then(this.throwIfError)
      .catch(this.catch)

    await this.cli
      .run([
        `workspaces`,
        `foreach`,
        `--all`,
        `--no-private`,
        `npm`,
        `publish`,
        `--access`,
        `public`,
        `--tag`,
        this.tag,
      ])
      .then(this.throwIfError)
      .catch(this.catch)

    await this.resetRegistry()

    this.context.stdout.write(`\n\n📦 Released: ${this.version}\n\n`)
  }

  /**
   * Get a unique identifier for the build.
   */
  public makeVersion(): string {
    const date = new Date()
    const utc = [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
    ]
    const rc = [date.getUTCHours(), date.getUTCMinutes()]
    return [utc.join(`.`), parseInt(rc.join(``))].join(`-`)
  }

  public async resetRegistry() {
    await this.cli
      .run([
        `config`,
        `set`,
        `npmPublishRegistry`,
        `https://registry.npmjs.org`,
      ])
      .catch(noop)

    await this.cli
      .run([
        `config`,
        `set`,
        `npmRegistryServer`,
        `https://registry.npmjs.org`,
      ])
      .catch(noop)

    await this.cli.run([`@bud`, `version`, `0.0.0`]).catch(noop)
    await this.cli.run([`install`]).catch(noop)
  }
}
