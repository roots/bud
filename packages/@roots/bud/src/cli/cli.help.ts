import BaseHelp from '@oclif/plugin-help'
import chalk from 'chalk'

export default class Help extends BaseHelp {
  // acts as a "router"
  // and based on the args it receives
  // calls one of showRootHelp, showTopicHelp,
  // or showCommandHelp
  // public showHelp(args: string[]): void {}

  // display the root help of a CLI
  // public showRootHelp(): void {}

  // display help for a topic
  // public showTopicHelp(topic: Topic): void {}

  // display help for a command
  // public showCommandHelp(command: Command): void {}

  // the default implementations of showRootHelp
  // showTopicHelp and showCommandHelp
  // will call various format methods that
  // provide the formatting for their corresponding
  // help sections;
  // these can be overwritten as well

  // the formatting responsible for the header
  // displayed for the root help
  public formatRoot(): string {
    return `\n${chalk.bold.underline`${this.config.name}`} (${
      this.config.version
    })\n\n${
      this.config.pjson.description
    }.\n\nUsage details available at ${
      this.config.pjson.homepage
    }.`
  }

  // the formatting for an individual topic
  // public formatTopic(topic: Topic): string {}

  // the formatting for a list of topics
  // protected formatTopics(topics: Topic[]): string {}

  // the formatting for a list of commands
  // public formatCommands(commands: Command[]): string {}

  // the formatting for an individual command
  // public formatCommand(command: Command): string {}
}
