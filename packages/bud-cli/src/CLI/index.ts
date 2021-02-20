import {yargs} from '@roots/bud-support'

/**
 * CLI
 */
export class CLI {
  /**
   * Yargs
   */
  public instance = yargs

  /**
   * Cwd
   */
  public cwd = process.cwd()

  /**
   * Command invocation
   */
  public command = 'bud'

  /**
   * Commands
   */
  public commands = [
    require('./commands/build'),
    require('./commands/publish'),
  ]

  /**
   * No command passed
   */
  public epilog = 'https://github.com/roots/bud'
  public demandCommand = `
    You must specify a command. See \`${this.command} --help\` for usage.
  `

  /**
   * Add command
   */
  public addCommand(cmd) {
    this.commands.push(cmd)
  }

  /**
   * Invoke command line stdout
   */
  public invoke(): void {
    this.commands.map(cmd => this.instance.command(cmd))

    this.instance
      .recommendCommands()
      .demandCommand(1, `${this.demandCommand}\n`)
      .usage(this.command)
      .version()
      .wrap(this.instance.terminalWidth())
      .epilog(this.epilog).argv
  }
}
