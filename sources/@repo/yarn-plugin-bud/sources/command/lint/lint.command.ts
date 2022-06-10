import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Lint command class
 *
 * @internal
 */
export class Lint extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'lint'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `lint repo files. run all linters by passing no flags.`,
    examples: [
      [`run all linters`, `yarn @bud lint`],
      [`run prettier`, `yarn @bud lint --prettier`],
      [`run eslint`, `yarn @bud lint --eslint`],
      [`run skypack`, `yarn @bud lint --skypack`],
      [`lint on type definitions as well`, `yarn @bud lint --types`],
    ],
  }

  /**
   * --prettier
   *
   * @internal
   */
  public prettier = Option.Boolean(`-p,--prettier`, false, {
    description: 'run prettier',
  })

  /**
   * --eslint
   *
   * @internal
   */
  public eslint = Option.Boolean(`-e,--eslint`, false, {
    description: 'run eslint',
  })

  /**
   * --skypack
   *
   * @internal
   */
  public skypack = Option.Boolean(`-s,--skypack`, false, {
    description: 'run skypack',
  })

  /**
   * --types
   *
   * @internal
   */
  public types = Option.Boolean(`-t,--types`, false, {
    description: 'includes types (prettier)',
  })

  /**
   * --lib
   *
   * @internal
   */
  public lib = Option.Boolean(`-l,--lib`, false, {
    description: 'includes lib (prettier)',
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    const all = !this.prettier && !this.skypack && !this.eslint

    if (all) {
      this.prettier = true
      this.skypack = true
      this.eslint = true
    }

    await this.$(
      ...[
        ...(this.eslint
          ? [
              `yarn eslint "./sources/@roots/*/src/**/*" --config ./config/eslint.config.cjs --ignore-path config/.eslintignore --no-error-on-unmatched-pattern`,
            ]
          : []),
        this.skypack
          ? `yarn workspaces foreach --no-private exec yarn run package-check`
          : null,
      ].filter(Boolean),
    )

    if (this.prettier) {
      await this.$(
        ...[
          `yarn prettier ./sources/@roots/*/src/**/* --config ./config/prettier.config.cjs --write --ignore-unknown --no-error-on-unmatched-pattern`,
          this.lib
            ? `yarn prettier ./sources/@roots/*/lib/**/* --config ./config/prettier.config.cjs --write --ignore-unknown --no-error-on-unmatched-pattern`
            : null,
          this.types
            ? `yarn prettier ./sources/@roots/*/types/**/*.d.ts --config ./config/prettier.config.cjs --write --ignore-unknown --no-error-on-unmatched-pattern`
            : null,
        ].filter(Boolean),
      )
    }
  }
}
