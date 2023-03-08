import BudCommand, {Option} from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'

/**
 * bud sage add command
 */
@dry
export class BudSageCommand extends BudCommand {
  /**
   * Command paths
   */
  public static override paths = [[`sage`, `add`]]

  /**
   * Command usage
   */
  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `Sage theme`,
    examples: [
      [`Add sass support`, `$0 sage add sass`],
      [`Add vue support`, `$0 sage add vue`],
    ],
  })

  /**
   * Positional options
   */
  public _packages = Option.Rest({name: `packages`, required: 1})

  /**
   * Mapp of shorthand to full package names
   */
  protected packageMap = {
    sass: `@roots/bud-sass`,
    scss: `@roots/bud-sass`,
    vue: `@roots/bud-vue`,
  }

  /**
   * Formatted packages to install
   */
  protected get packages() {
    return this._packages.map(
      pkg => `${this.packageMap[pkg]}@${this.bud.context.bud.version}`,
    )
  }

  /**
   * Command execute
   */
  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()
    await this.cli.run([`install`, `--dev`, ...this.packages])
  }
}
