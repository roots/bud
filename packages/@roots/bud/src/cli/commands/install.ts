import * as oclif from '@oclif/core'
import {pkgUp, prettyFormat} from '@roots/bud-support'
import {readJson} from 'fs-extra'

import {Command} from '../Command/index.js'

/**
 * @internal
 */
export default class Install extends Command {
  /**
   * @internal
   */
  public static id: string = 'install'

  /**
   * @internal
   */
  public static description = 'install peer dependencies'

  /**
   * @internal
   */
  public static examples = ['$ bud install']

  /**
   * @internal
   */
  public static aliases = ['init']

  /**
   * @internal
   */
  public static flags = {
    ...Command.flags,
    ['log']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @internal
   */
  public async run() {
    await this.prime(Install)

    const manifestPath = await pkgUp()

    const {version: frameworkVersion} = await readJson(
      manifestPath,
    )

    await Promise.all(
      this.app.project
        .getEntries('extensions')
        .map(async ([name, extension]) => {
          this.app.log(`checking ${name}`)
          this.app.log(prettyFormat(extension.missingExtensions))
          if (extension.missingExtensions?.length) {
            await this.app.dependencies.install(
              extension.missingExtensions.map(ext => ({
                name: ext,
                version: frameworkVersion,
              })),
            )
          }
        }),
    )

    this.app.project.buildProfile()

    await Promise.all(
      this.app.project
        .getEntries('extensions')
        .map(async ([name, extension]) => {
          if (extension.missingPeers?.length) {
            this.log(
              extension.missingPeers.reduce(
                (a, c) =>
                  c
                    ? `${a} [${name}] ${c.name}@${c.version}\n`
                    : a,
                `installing:\n`,
              ),
            )

            await this.app.dependencies.install(
              extension.missingPeers,
            )
          }
        }),
    )

    process.exit(0)
  }
}
