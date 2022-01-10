import * as oclif from '@oclif/core'
import {fs, pkgUp} from '@roots/bud-support'

import {Command} from '../Command/index.js'

const {readJson, writeFile} = fs

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
    ['log.papertrail']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @internal
   */
  public async run() {
    await this.prime(Install)
    await this.app.project.buildProfile()

    const manifestPath = await pkgUp()
    process.stdout.write(
      `\nupdating ${manifestPath.replace(process.cwd(), '')}\n`,
    )
    const manifest = await readJson(manifestPath)

    const peerDependencies = Array.from(
      this.app.project.peers.peerDependencies.entries(),
    )

    manifest.devDependencies = {
      ...manifest.devDependencies,
      ...peerDependencies.reduce(
        (a, [name, version]) => ({
          ...a,
          [name]: version,
        }),
        {},
      ),
    }

    await writeFile(
      manifestPath,
      JSON.stringify(manifest, null, 2),
    )

    process.stdout.write(
      `\nadded ${peerDependencies.reduce(
        (a, [name, version]) => `${a} - ${name}@${version}\n`,
        `\n`,
      )}\n run yarn/npm install to finalize\n`,
    )

    this.exit(0)
  }
}
