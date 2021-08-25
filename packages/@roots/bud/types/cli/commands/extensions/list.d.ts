import {Framework} from '../../..'
import {Command} from '../../Command'
export default class List extends Command {
  static description: string
  static examples: string[]
  cli: {
    flags: any
    args: any
  }
  app: Framework
  run(): Promise<void>
}
//# sourceMappingURL=list.d.ts.map
