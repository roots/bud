import {Mark} from '@roots/bud-dashboard'
import Commander from 'commander'
import Output from './Output'
import {CLIConstructor, Command} from './interface'

/**
 * CLI
 */
export class CLI {
  /**
   * Command invocation
   */
  public name: string

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
  public _commands: Command.Declaration

  /**
   * Constructor
   */
  public constructor(args?: CLIConstructor) {
    this.name = args.name
    this.projectUrl = args.projectUrl
    this.commands = args.commands

    this.instance = new Commander.Command(this.name)
    const output = new Output(this.name, this.instance)

    this.instance
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

  public get commands(): Command.Declaration {
    return this._commands
  }

  public set commands(commands: Command.Declaration) {
    this._commands = commands
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    Object.values(this.commands).map(
      (Sub: new () => Command) => {
        const sub = new Sub()

        const command = new Commander.Command()
          .command(`${sub.name} ${sub.signature}`)
          .description(sub.description, sub.arguments)
          .action(sub.action)
          .usage(sub.usage)

        command.configureOutput(
          new Output(this.name, command).config,
        )

        sub.has('options') &&
          Object.values(sub.options).map(opt => {
            const option = new Commander.Option(
              opt.flags,
              opt.description,
            )

            opt.default && option.default(opt.default)
            opt.choices && option.choices(opt.choices)

            typeof opt.optional == 'boolean' &&
              (() => {
                option.mandatory = !opt.optional
              })()

            command.addOption(option)
          })

        this.instance.addCommand(command)
      },
    )

    this.instance.parse()
  }

  /**
   * CLI banner
   */
  public mast(): this {
    console.log(Mark(this.name))
    return this
  }
}
