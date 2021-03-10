import {Mark} from '@roots/bud-dashboard'
import {render} from 'ink-testing-library'
import Commander from 'commander'
import Output from './Output'
import {CLIConstructor, Command} from './interface'
import Config from './Config'
import {Framework} from '@roots/bud-framework'

/**
 * CLI
 */
export class CLI {
  /**
   * Application
   */
  public app: Framework

  /**
   * Config source
   */
  public config: Config

  /**
   * Command invocation
   */
  public name: string = 'bud'

  /**
   * Command description
   */
  public description: string = 'Bud CLI'

  /**
   * Project URL
   */
  public projectUrl: string

  /**
   * Yargs
   */
  public instance: Commander.Command

  /**
   * Output
   */
  public output: Output

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Commands
   */
  public _commands: Command.Newable[]

  /**
   * Constructor
   */
  public constructor(args?: CLIConstructor) {
    this.name = args.name
    this.app = args.app
    this.projectUrl = args.projectUrl
    this.commands = args.commands

    this.config = new Config(this)
    this.instance = new Commander.Command(this.name)

    const output = new Output(this.name, this.instance)

    this.instance
      .allowUnknownOption()
      .allowExcessArguments()
      .configureOutput(output.config)
      .usage('[command]')
      .storeOptionsAsProperties(true)
      .addHelpCommand(
        'help [command]',
        'Get help with a [command]',
      )
      .action(() => {
        output.writeOut(this.instance.helpInformation())
      })
  }

  public get commands(): Command.Newable[] {
    return this._commands
  }

  public set commands(commands: Command.Newable[]) {
    this._commands = commands
  }

  public merge(commands: Command.Newable[]) {
    this.commands = [...this.commands, ...commands]
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.commands.map((Sub: Command.Newable) => {
      const sub = new Sub(this)

      const command = new Commander.Command()
        .command(`${sub.name} ${sub.signature}`)
        .allowUnknownOption()
        .allowExcessArguments()
        .description(sub.description, sub.arguments)
        .action(sub.action)
        .usage(sub.usage)

      command.configureOutput(
        new Output(this.name, command).config,
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
    console.log(render(Mark({text: this.name})).lastFrame())

    return this
  }
}
