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

  public getMissingPeers(): {name: string; version: string}[] {
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

    this.app.dashboard.render(
      'Installing peer dependencies',
      '$ bud init',
    )

    if (this.hasMissingPeers()) {
      this.app.dashboard.render(
        this.getMissingPeers().reduce(
          (acc, {name, version}, i) => {
            return [...acc, `- Installing ${name}@${version}`]
          },
          [],
        ),
        '$ bud init',
      )

      this.app.project.peers.install()
      this.app.dashboard.render(
        'All peer packages installed',
        '$ bud init',
      )
    } else {
      this.app.dashboard.render(
        'All set. Nothing to install',
        '$ bud init',
      )
    }

    process.exit()
  }
}
