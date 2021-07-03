import {flags} from '@oclif/command'
import Command from '../../Command'
import {Framework, config} from '@roots/bud'
import Runner from '../../Runner'
import format from 'pretty-format'

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
    mode: flags.string({
      description: 'build environment mode',
      default: 'production',
    }),
  }

  public cli: {flags: any; args: any}

  public app: Framework

  public async run() {
    this.cli = this.parse(Doctor)

    const runner = new Runner(this.cli, {
      config,
      mode: this.cli.flags.mode,
    })

    this.app = await runner.make(false)

    Object.entries(this.cli.flags).forEach(([k, v]) => {
      this.app.store.set(k, v)

      this.app.children.every((_name, child) => {
        child.store.set(k, v)
      })
    })

    if (this.cli.flags.cache) {
      this.app.persist()

      this.app.children.every((_name, child) => {
        child.persist()
      })
    }

    if (this.cli.flags.minimize) {
      this.app.minimize()

      this.app.children.every((_name, child) => {
        child.minimize()
      })
    }

    /**
     * Target was specified
     */
    if (this.cli.flags.target.length > 0) {
      !this.cli.flags.target.includes('parent') &&
        !this.cli.flags.target.includes('bud') &&
        !this.cli.flags.target.includes('global') &&
        this.app.hooks.on('build/entry', false)

      this.app.children.getKeys().forEach(name => {
        !this.cli.flags.target.includes(name) &&
          this.app.children.remove(name)
      })
    }

    this.app.logger.instance
      .scope('cli')
      .timeEnd('pre compilation')

    this.app.dashboard.render(
      format(this.app.build.config, {
        indent: 2,
      }),
    )

    process.exit()
  }
}
