import {Framework} from '../../..'
import {Command} from '../../Command'
export default class Install extends Command {
  static description: string
  static aliases: string[]
  static examples: string[]
  cli: {
    flags: any
    args: any
  }
  app: Framework
  run(): Promise<void>
}
//# sourceMappingURL=install.d.ts.map
