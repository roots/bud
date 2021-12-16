import * as oclif from '@oclif/core'
import {pkgUp} from '@roots/bud-support'
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

    process.stdout.write('Installing extensions...\n')

    const installExtensions = this.app.project
      .getEntries('extensions')
      .reduce((a, [name, extension]) => {
        return [
          ...a,
          ...extension.missingExtensions.map(
            ext =>
              ({
                name: ext,
                version: frameworkVersion,
              } ?? null),
          ),
        ]
      }, [])
      .filter(Boolean)

    process.stdout.write('Installing peers...\n')

    if (installExtensions?.length) {
      await this.app.dependencies.install(installExtensions)
    }

    this.app.project.buildProfile()

    const installPeers = this.app.project
      .getEntries('extensions')
      .reduce((a, [name, extension]) => {
        return [...a, ...(extension.missingPeers ?? [])]
      }, [])

    if (installPeers?.length) {
      await this.app.dependencies.install(installPeers)
    }

    process.exit(0)
  }
}
