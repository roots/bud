import {flags} from '@oclif/command'
import Command from '../../Command'
import {Framework, config} from '@roots/bud'
import Runner from '../../Runner'

export default class Doctor extends Command {
  public static description = 'Help diagnose issues with Bud'

  public static examples = [`$ bud doctor`]

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

  public cli: {flags: any; args: any}

  public app: Framework

  public mode: 'development' | 'production' = 'production'

  public async run() {
    this.cli = this.parse(Doctor)

    const runner = new Runner(this.cli, {
      config,
      mode: 'production',
    })
    this.app = await runner.make()

    if (this.app.discovery.has('required')) {
      const missingPeers = this.app.discovery
        .getValues('required')
        .filter(
          dep => !this.app.discovery.hasPeerDependency(dep.name),
        )

      if (missingPeers.length > 0) {
        this.app.dashboard.render(
          [
            'Missing dependencies:\n',
            ...missingPeers?.map(peer => `❌ ${peer.name}`),
          ],
          'bud doctor',
        )

        process.exit()
      }
    }

    this.app.dashboard.render(
      ['All checks are O.K.'],
      'bud doctor',
    )

    process.exit()
  }
}
