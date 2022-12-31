import type {CommandContext} from '@roots/bud-framework/options'

import type BudCommand from '../commands/bud.js'

export function dry(constructor: typeof BudCommand): any {
  return class extends constructor {
    public constructor() {
      super()

      const fn = this.withArguments?.bind(this) ?? (value => value)

      this.withArguments = async (args: CommandContext[`args`]) => {
        args = await fn(args)
        return {...args, dry: true}
      }
    }
  }
}
