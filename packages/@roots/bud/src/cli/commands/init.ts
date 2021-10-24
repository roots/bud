import {chalk} from '@roots/bud-support'

import type {Bud} from '../../Bud'
import {Command} from '../Command'
import {Runner} from '../Runner'

export default class Init extends Command {
  public static id = 'init'
  public static title = 'init'
  public static description = 'install peer dependencies'
  public static examples = [`$ bud init`]

  public app: Bud

  public hasMissingPeers(): boolean {
    return this.getMissingPeers()?.length > 0
  }

  public getMissingPeers(): any[] {
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
    this.app = new Runner(this.parse(Init)).app
    const output = []

    this.getMissingPeers().map(pkg => {
      this.app.dashboard.render(
        [
          ...output,
          chalk
            .yellow(`↯`)
            .concat(
              `  ...Installing ${chalk.blue(
                `${pkg.name}@${pkg.version}`,
              )} to ${chalk.magenta(pkg.type)}`,
            ),
        ],
        'Installing',
      )

      this.app.dependencies.install([pkg])

      output.push(
        chalk
          .green(`✓`)
          .concat(
            `  Installed ${chalk.blue(
              `${pkg.name}@${pkg.version}`,
            )} to ${chalk.magenta(pkg.type)}`,
          ),
      )
    })

    this.app.dashboard.render(
      [...output, '\n✨ All peer packages installed'],
      'Installation complete',
    )

    process.exit()
  }
}
