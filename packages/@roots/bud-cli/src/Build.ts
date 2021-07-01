import {flags} from '@oclif/command'
import Command from './Command'
import {Framework, config} from '@roots/bud'
import Runner from './Runner'

export default class Build extends Command {
  public static description = 'Build application'

  public mode: 'development' | 'production'

  public cli: {flags: any; args: any}

  public app: Framework

  public static flags = {
    help: flags.help({char: 'h'}),
    cache: flags.boolean({
      char: 'c',
      description: 'cache compiler references to disk',
    }),
    ci: flags.boolean({
      description: 'non raw mode tty interoperable output',
    }),
    debug: flags.boolean({
      char: 'd',
      description: 'produce config artifacts in [storage] dir',
    }),
    log: flags.boolean({
      char: 'l',
      description: 'log to console',
    }),
    hash: flags.boolean({
      description: 'hash compiled filenames',
    }),
    manifest: flags.boolean({
      description: 'produce a manifest',
    }),
    minimize: flags.boolean({
      char: 'm',
      description: 'minimize file size of compiled assets',
    }),
    target: flags.string({
      char: 't',
      description: 'limit compilation to this compiler',
      multiple: true,
      default: [],
    }),
  }

  public async run() {
    this.cli = this.parse(Build)

    const runner = new Runner(this.cli, {
      config,
      mode: this.mode,
    })
    this.app = await runner.make()

    this.app.hooks.on('done', () =>
      this.notifier.notify(this.app),
    )

    this.app.logger.instance
      .scope('cli')
      .timeEnd('pre compilation')

    this.app.run()
  }
}
