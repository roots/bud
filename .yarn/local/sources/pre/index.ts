import {Command} from '../Command'
import {Option} from 'clipanion'

export class PreCommand extends Command {
  static paths = [[`kjo`, `pre`]]

  public site = Option.Boolean(`-s,--site`, false)
  public readme = Option.Boolean(`-r,--readme`, false)
  public commands = {
    site: [`yarn ts-node ./dev/site`, `yarn docusaurus build`],
    readme: [`yarn ts-node ./dev/readme`],
  }

  async execute() {
    const itinerary = []

    if (this.site) itinerary.push(this.commands.site)
    if (this.readme) itinerary.push(this.commands.readme)

    if (!this.site && !this.readme)
      itinerary.push(
        Object.values(this.commands).reduce((a, v) => [
          ...a,
          ...v,
        ]),
        [],
      )

    await this.$(itinerary)
  }
}
