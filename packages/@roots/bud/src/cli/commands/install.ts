import * as oclif from '@oclif/core'
import {pkgUp} from '@roots/bud-support'
import {readJson} from 'fs-extra'

import {Peers} from '../../services/Project/peers/peers.service'
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

    const {version} = await readJson(manifestPath)

    const peers = new Peers(this.app, version)

    console.log(peers.graph.inspect())

    const installExtensions = peers.graph
      .getAttribute('missingPeers')
      .reduce(
        (acc, {peer, version}) => [
          ...acc,
          {name: peer, version},
        ],
        [],
      )

    process.stdout.write('Installing peers...\n')

    await this.app.dependencies.install(installExtensions)

    process.exit(0)
  }
}
