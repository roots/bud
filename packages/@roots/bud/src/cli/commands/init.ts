import {chalk, execa} from '@roots/bud-support'

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
    const runner = new Runner(this.parse(Init))
    await runner.initialize()
    this.app = runner.app

    const pkgs = this.getMissingPeers().reduce(
      (acc, dependency) =>
        `${acc} ${dependency.name}@${dependency.version}`,
      ``,
    )

    if (!pkgs.length) {
      this.app.dashboard.render(
        `All peer dependencies met. Nothing to install.`,
        '$ bud init',
      )
      process.exit()
    }

    const cmd = this.app.dependencies.manager.isYarn()
      ? `yarn add${pkgs} --dev`
      : `npm install${pkgs} --save-dev`

    const output = [chalk.blue`${cmd}\n`]

    this.app.dashboard.render(output, `$bud init`)

    const task = execa.command(cmd)
    task.stdout.on('data', data => {
      output.push(data.toString())
      this.app.dashboard.render(output, `$ bud init`)
    })
    task.stderr.on('data', data => {
      output.push(data.toString())
      this.app.dashboard.render(output, `$ bud init`)
    })
    await task.finally()

    output.push(chalk.green`✨ All peer packages installed`)

    this.app.dashboard.render(output, '$ bud init')
    process.exit()
  }
}
