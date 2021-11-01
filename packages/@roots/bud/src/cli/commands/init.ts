import execa from 'execa'

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
      ? this.app.project.getValues('peers')
      : []
  }

  public async run() {
    const runner = new Runner(this.parse(Init), {
      config: {ci: true},
    })
    await runner.initialize()
    this.app = runner.app

    const pkgs = this.getMissingPeers().reduce(
      (acc, dependency) =>
        `${acc} ${dependency.name}@${dependency.version}`,
      ``,
    )

    if (!pkgs.length) {
      this.app.success(
        'All peer dependencies met. Nothing to install',
      )
      process.exit()
    }

    const cmd = this.app.dependencies.manager.isYarn()
      ? `yarn add${pkgs} --dev`
      : `npm install${pkgs} --save-dev`

    this.app.info(cmd)

    const task = execa.command(cmd)
    task.stdout.pipe(process.stdout)
    task.stderr.pipe(process.stderr)
    await task.finally()

    this.app.success(`✨ All peer packages installed`)
    process.exit()
  }
}
