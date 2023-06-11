/* eslint-disable n/no-process-env */
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Release command
 */
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

  public async execute() {
    // Little bit of extra safety
    // Don't want to accidentally publish to npm
    // when running integration tests locally
    if (
      (!process.env.ci && !process.env.CI) ||
      this.registry === `http://localhost:4873`
    ) {
      try {
        await this.promise(
          `Using local registry`,
          `Local registry set`,
          `Failed to set local registry`,
          new Promise(async (resolve, reject) => {
            try {
              await this.cli.run([
                `config`,
                `set`,
                `npmPublishRegistry`,
                `http://localhost:4873`,
              ])
              await this.cli.run([
                `config`,
                `set`,
                `npmRegistryServer`,
                `http://localhost:4873`,
              ])
              resolve(true)
            } catch (e) {
              reject(e)
            }
          }),
        )
      } catch (e) {
        throw e
      }
    }

    if (!this.version) {
      const date = new Date()
      const utcSemver = `${date.getUTCFullYear()}.${
        date.getUTCMonth() + 1
      }.${date.getUTCDate()}`

      try {
        await this.cli.run([
          `exec`,
          `npm`,
          `show`,
          `@roots/bud@${utcSemver}`,
          `--tag`,
          this.tag,
          `--registry`,
          this.registry,
        ])

        this.version = `${utcSemver}-${date.getUTCHours()}${date.getUTCMinutes()}`
      } catch (e) {
        this.version = utcSemver
      }
    }

    await this.cli.run([`@bud`, `version`, this.version])

    try {
      await this.promise(
        `Publishing packages at ${this.version}`,
        `Packages published`,
        `Failed to publish packages`,
        this.cli.run([
          `workspaces`,
          `foreach`,
          `--no-private`,
          `npm`,
          `publish`,
          `--access`,
          `public`,
          `--tag`,
          this.tag,
        ]),
      )
    } catch (e) {
      throw e
    }

    await this.cli.run([`@bud`, `version`, `0.0.0`])

    try {
      await this.promise(
        `Resetting registry`,
        `Registry reset`,
        `Failed to reset registry`,
        new Promise(async resolve => {
          await this.cli.run([
            `config`,
            `set`,
            `npmPublishRegistry`,
            `https://registry.npmjs.org`,
          ])
          await this.cli.run([
            `config`,
            `set`,
            `npmRegistryServer`,
            `https://registry.npmjs.org`,
          ])
          resolve(true)
        }),
      )
    } catch (e) {
      throw e
    }
  }
}
