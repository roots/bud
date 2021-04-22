import {Bud, BudFactory, services} from '@roots/bud'
import {Container} from '@roots/container'
import Commander from 'commander'
import {boundMethod as bind} from 'autobind-decorator'

import {Command} from './Command'
import {config} from './config'
import {commands} from './commands'

/**
 * CLI
 */
export class CLI {
  /**
   * Command invocation
   */
  public _name: string = 'bud'

  /**
   * Command description
   */
  public description: string = 'Bud CLI'

  /**
   * App
   */
  public _app: BudFactory

  /**
   * Base config
   */
  public _baseConfig: (app: Bud) => Bud

  /**
   * Commands
   */
  public commands: Container

  /**
   * Commander
   */
  public program: Commander.Command

  /**
   * Register
   */
  public constructor(
    budFactory: BudFactory,
    baseConfig?: (app: Bud) => Bud,
  ) {
    this.app = budFactory
    this.baseConfig = baseConfig ?? null
    this.commands = new Container(commands)
  }

  public get app() {
    return this._app
  }

  public set app(app: BudFactory) {
    this._app = app
  }

  public get baseConfig() {
    return this._baseConfig
  }

  public set baseConfig(baseConfig: (app: Bud) => Bud) {
    this._baseConfig = baseConfig
  }

  public get name() {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  /**
   * Boot CLI
   */
  @bind
  public boot() {
    this.program = new Commander.Command(this.name)
      .allowUnknownOption()
      .allowExcessArguments()
      .usage('[command]')
      .storeOptionsAsProperties(true)
      .addHelpCommand(
        'help [command]',
        'Get help with a [command]',
      )

    this.commands.every(this.initializeCommand)

    this.program
      .allowExcessArguments()
      .allowUnknownOption()
      .parse(process.argv)
  }

  /**
   * Initialize new command
   */
  @bind
  public initializeCommand(
    _name: string,
    Command: Command.Newable,
  ) {
    /**
     * Setup command
     */
    const command = new Command(this)

    const instance = new Commander.Command()
      .command(`${command.name} ${command.signature}`)
      .allowUnknownOption()
      .allowExcessArguments()
      .description(command.description, command.arguments)
      .action(command.action)
      .usage(command.usage)

    /**
     * Command options
     */
    command.has('options') &&
      Object.entries(command.options).map(([k, opt]) => {
        const option: Commander.Option = new Commander.Option(
          opt.flags ?? `--${k}`,
        )

        if (opt.description)
          option.description = opt.description ?? ''

        opt.default && option.default(opt.default)
        instance.addOption(option)
      })

    this.program.addCommand(instance)
  }

  /**
   * Make app instance
   */
  @bind
  public makeApp(mode: 'production' | 'development'): Bud {
    return this.app(services, mode)
  }

  @bind
  public runAppBuild(app: Bud, cb?: (app: Bud) => Bud) {
    const override = cb ? cb : app => app
    const projectConfig = config(this.name)

    override(
      this.baseConfig
        ? projectConfig(this.baseConfig(app.lifecycle()))
        : projectConfig(app.lifecycle()),
    ).run()
  }
}
