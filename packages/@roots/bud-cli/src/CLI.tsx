import {Mark} from '@roots/bud-dashboard'
import {render} from 'ink-testing-library'
import Commander from 'commander'
import Output from './Output'
import {Command} from './interface'
import {Builder} from './Builder'
import {commands} from './commands'
import {Framework} from '@roots/bud-framework'
import {Container} from '@roots/container'

/**
 * CLI
 */
export class CLI {
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
   * Config source
   */
  public builder: Builder

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
    this.builder = new Builder()
  }

  /**
   * Boot
   */
  public boot() {
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

    this.commands.every((name: string, Sub: Command.Newable) => {
      const sub = new Sub(this)

      const command = new Commander.Command()
        .command(`${sub.name} ${sub.signature}`)
        .allowUnknownOption()
        .allowExcessArguments()
        .description(sub.description, sub.arguments)
        .action(sub.action)
        .usage(sub.usage)

      command.configureOutput(
        new Output(this.app.name, command).config,
      )

      sub.has('options') &&
        Object.entries(sub.options).map(([k, opt]) => {
          const option: Commander.Option = new Commander.Option(
            opt.flags ?? `--${k}`,
          )

          if (opt.description)
            option.description = opt.description ?? ''

          opt.default && option.default(opt.default)
          command.addOption(option)
        })

      this.instance.addCommand(command)
    })

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
