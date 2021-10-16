import type {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Init extends Command {
  public static description = 'install peer dependencies'

  public static aliases = ['init']

  public static examples = [`$ bud init`]

  public app: Bud

  public hasMissingPeers(): boolean {
    return this.getMissingPeers()?.length > 0
  }

  public getMissingPeers(): {name: string}[] {
    return this.app.project.has('peers')
      ? this.app.project
          .getValues('peers')
          ?.filter(
            (dep: {name: string}) =>
              !this.app.project.hasPeerDependency(dep.name),
          )
      : []
  }

  public async run() {
    const runner = new Runner(this.parse(Init))
    this.app = await runner.make(false)

    if (this.hasMissingPeers()) {
      this.app.project.peers.install()
    } else {
      this.app.dashboard.render(
        `Peer dependencies already installed`,
        '$ bud init',
      )
    }

    process.exit()
  }
}
