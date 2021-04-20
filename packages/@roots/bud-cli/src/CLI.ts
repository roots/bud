import {Command} from './Command'
import {Framework} from '@roots/bud-framework'
import {Container} from '@roots/container'
import Commander from 'commander'
import Output from './Output'
import {commands} from './commands'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * CLI
 */
export class CLI {
  /**
   * Command invocation
   */
  public name: string = 'bud'

  /**
   * Command description
   */
  public description: string = 'Bud CLI'

  /**
   * App
   */
  public app: Framework

  /**
   * Commands
   */
  public commands: Container

  /**
   * Commander
   */
  public program: Commander.Command

  /**
   * Output
   */
  public output: Output

  /**
   * Register
   */
  public constructor(app: Framework) {
    this.app = app

    this.commands = app.container(commands)
    this.program = new Commander.Command(this.app.name)
      .allowUnknownOption()
      .allowExcessArguments()
      .usage('[command]')
      .storeOptionsAsProperties(true)
      .addHelpCommand(
        'help [command]',
        'Get help with a [command]',
      )

    this.output = new Output(this.app.name, this.program)
  }

  /**
   * Set command name
   */
  @bind
  public setName(name: string) {
    this.name = name
  }

  /**
   * Boot
   */
  @bind
  public boot() {
    this.commands.every(this.initializeCommand)

    this.program
      .configureOutput(new Output(this.app.name, this.program))
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
}
