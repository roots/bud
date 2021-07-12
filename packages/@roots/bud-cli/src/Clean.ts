import {flags} from '@oclif/command'
import Command from './Command'
import {Framework, config} from '@roots/bud'
import Runner from './Runner'
import {remove} from 'fs-extra'

export default class Clean extends Command {
  public app: Framework

  public cli: {flags: any; args: any}

  public static flags = {
    help: flags.help({char: 'h'}),
    cache: flags.boolean({
      char: 'c',
      description: 'cache compiler references to disk',
    }),
    log: flags.boolean({
      char: 'l',
      description: 'log to console',
    }),
  }

  public target: ['all' | 'storage' | 'dist', string?]

  public async run() {
    this.cli = this.parse(Clean)

    const runner = new Runner(this.cli, {
      config,
    })

    this.app = await runner.make(false)

    this.app.logger.instance.scope('cli').timeEnd('pre clean')

    this.app.logger.instance.scope('cli').time('clean')

    this.app.logger.instance.scope('cli').debug(this.app)

    if (this.target[0] !== 'all') {
      try {
        await remove(
          this.app.path(
            this.target[0],
            ...this.target.splice(1),
          ),
        )
      } catch (err) {
        this.app.logger.instance.error(err)
      }
    } else {
      try {
        await remove(this.app.path('storage'))
      } catch (err) {
        this.app.logger.instance.error(err)
      }

      try {
        await remove(this.app.path('dist'))
      } catch (err) {
        this.app.logger.instance.error(err)
      }
    }

    this.app.logger.instance.scope('cli').timeEnd('clean')

    process.exit()
  }
}
