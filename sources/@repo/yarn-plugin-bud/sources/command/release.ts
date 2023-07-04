/* eslint-disable n/no-process-env */
import {CommandClass, Option} from 'clipanion'

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

  public override async catch(error: Error) {
    await this.resetRegistry()
    throw error
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
      const date = new Date()
      const utcSemver = `${date.getUTCFullYear()}.${
        date.getUTCMonth() + 1
      }.${date.getUTCDate()}`

      await this.cli
        .run([
          `exec`,
          `npm`,
          `show`,
          `@roots/bud@${utcSemver}`,
          `--tag`,
          this.tag,
          `--registry`,
          this.registry,
        ])
        .then(() => {
          this.version = `${utcSemver}-${date.getUTCHours()}${date.getUTCMinutes()}`
        })
        .catch(() => {
          this.version = utcSemver
        })
    }

    await this.cli
      .run([`@bud`, `version`, this.version])
      .then(this.throwIfError)
      .catch(this.catch)

    await this.cli
      .run([
        `workspaces`,
        `foreach`,
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
  }

  public async resetRegistry() {
    await this.cli
      .run([
        `config`,
        `set`,
        `npmPublishRegistry`,
        `https://registry.npmjs.org`,
      ])
      .catch(e => {})

    await this.cli
      .run([
        `config`,
        `set`,
        `npmRegistryServer`,
        `https://registry.npmjs.org`,
      ])
      .catch(e => {})

    await this.cli.run([`@bud`, `version`, `0.0.0`]).catch(e => {})

    await this.cli.run([`install`]).catch(e => {})
  }
}
