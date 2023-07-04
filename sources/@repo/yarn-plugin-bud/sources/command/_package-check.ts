import {CommandClass, Option} from 'clipanion'
import {globby} from 'globby'

import {Command} from './base.command'

/**
 * PackageCheck command class
 */
export class PackageCheck extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `package-check`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `PackageCheck passthrough`,
    examples: [
      [`package-check usage info`, `yarn @bud package-check --help`],
    ],
  }

  public passthrough = Option.Proxy({name: `pm2 options`})

  public async execute() {
    await globby([`sources/@roots/*`], {
      onlyDirectories: true,
    })
      .then(
        async dirs =>
          await Promise.all(
            [...dirs, `sources/create-bud-app`].flatMap(
              async dir =>
                await this.cli
                  .run([`package-check`, `--cwd`, dir])
                  .then(this.throwIfError)
                  .catch(this.catch),
            ),
          ).catch(this.catch),
      )
      .catch(this.catch)
  }
}
