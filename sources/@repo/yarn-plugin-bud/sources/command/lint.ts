import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {globby} from 'globby'

import {Command} from './base.command'

/**
 * Lint command class
 */
export class Lint extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Lint project`,
  }

  public async execute() {
    const dirs = await globby([`sources/@roots/*`], {
      onlyDirectories: true,
    }).then(dirs => [...dirs, `sources/create-bud-app`])

    this.promised.push(
      this.cli.run([
        `eslint`,
        path(`sources/*/*/src/**/*.{ts,tsx,js,jsx}`),
        path(`sources/*/*/sources/**/*.{ts,tsx,js,jsx}`),
        path(`tests/**/*.{ts,tsx,js,jsx}`),
        path(`config/**/*.{ts,tsx,js,jsx}`),
        `--config`,
        path(`config/eslint.config.cjs`),
        `--no-error-on-unmatched-pattern`,
        `--fix`,
      ]),
    )

    this.promised.push(this.cli.run([`constraints`]))

    this.promised.push(
      this.cli.run([
        `syncpack`,
        `list-mismatches`,
        `--config`,
        path(`config/syncpack.config.cjs`),
      ]),
    )

    this.promised.push(
      this.cli.run([
        `prettier`,
        path(`sources/@roots/*/src/**/*`),
        `--write`,
        `--config`,
        path(`config/prettier.config.cjs`),
        `--ignore-unknown`,
        `--no-error-on-unmatched-pattern`,
      ]),
    )

    this.promised.push(
      ...dirs.map(dir =>
        this.cli.run([`package-check`, `--cwd`, `${dir}`]),
      ),
    )

    try {
      await this.promise(
        `Linting source files`,
        `All source files linted successfully`,
        `Linting failed`,
        Promise.all(this.promised),
      )
    } catch (e) {
      throw e
    }
  }
}
