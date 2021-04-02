import {Framework} from '@roots/bud-framework'
import Commander from 'commander'
import {Container} from '@roots/container'

import {Mark} from '@roots/bud-dashboard'
import {render} from 'ink-testing-library'
import Output from './Output'
import {Command} from './interface'
import {commands} from './commands'

/**
 * CLI
 */
export class CLI {
  /**
   * App
   */
  public app: Framework

  /**
   * Command invocation
   */
  public name: string = 'bud'

  /**
   * Command description
   */
  public description: string = 'Bud CLI'

  /**
   * Commands
   */
  public commands: Container

  /**
   * Commander
   */
  public instance: Commander.Command

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
    this.instance = new Commander.Command(this.app.name)
    this.output = new Output(this.app.name, this.instance)
  }

  /**
   * Boot
   */
  public boot() {
    /**
     * Configures commander
     */
    this.instance
      .allowUnknownOption()
      .allowExcessArguments()
      .configureOutput(this.output.config)
      .usage('[command]')
      .storeOptionsAsProperties(true)
      .addHelpCommand(
        'help [command]',
        'Get help with a [command]',
      )

    /**
     * Processes registered commands
     */
    this.commands.every(
      (name: string, Command: Command.Newable) => {
        const command = new Command(this)

        const commandInstance = new Commander.Command()
          .command(`${command.name} ${command.signature}`)
          .allowUnknownOption()
          .allowExcessArguments()
          .description(command.description, command.arguments)
          .action(command.action)
          .usage(command.usage)

        commandInstance.configureOutput(
          new Output(this.app.name, commandInstance).config,
        )

        command.has('options') &&
          Object.entries(command.options).map(([k, opt]) => {
            const option: Commander.Option = new Commander.Option(
              opt.flags ?? `--${k}`,
            )

            if (opt.description)
              option.description = opt.description ?? ''

            opt.default && option.default(opt.default)
            commandInstance.addOption(option)
          })

        this.instance.addCommand(commandInstance)
      },
    )

    this.instance
      .allowExcessArguments()
      .allowUnknownOption()
      .parse()
  }

  /**
   * CLI banner
   */
  public mast(): this {
    console.log(render(Mark({text: this.app.name})).lastFrame())

    return this
  }
}
