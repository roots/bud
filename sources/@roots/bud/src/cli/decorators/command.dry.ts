import type BudCommand from '@roots/bud/cli/commands/bud'
import type {CommandContext} from '@roots/bud-framework/options'

export function dry<T extends new (...args: any[]) => BudCommand>(
  constructor: T,
) {
  return class extends constructor {
    public constructor(...args: any[]) {
      super(...args)
      if (this.withArguments) {
        const existingFn = this.withArguments
        this.withArguments = async (args: CommandContext[`args`]) => {
          args = await existingFn(args)
          return {
            ...args,
            dry: true,
          }
        }
      }
    }
  }
}
