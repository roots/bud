import * as repo from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Docs command class
 */
export class Docs extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `docs`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build docs and other markdown files`,
    examples: [[`build docs and readme`, `yarn @bud docs`]],
  }

  public async execute() {
    try {
      await this.cli.run([`@bud`, `build`])

      await this.promise(
        `Building @repo/markdown-kit`,
        `Built @repo/markdown-kit`,
        `Failed to build @repo/markdown-kit`,
        this.cli.run([`workspace`, `@repo/markdown-kit`, `run`, `build`]),
      )

      await this.promise(
        `Updating README.md and co-located documentation`,
        `Updated README.md and co-located documentation`,
        `Failed to update README.md and co-located documentation`,
        Promise.all([
          this.cli.run([
            `workspace`,
            `@repo/markdown-kit`,
            `exec`,
            `node`,
            `compiled/cli-examples/index.js`,
          ]),
          this.cli.run([
            `workspace`,
            `@repo/markdown-kit`,
            `exec`,
            `node`,
            `compiled/releases/index.js`,
          ]),
          this.cli.run([
            `workspace`,
            `@repo/markdown-kit`,
            `exec`,
            `node`,
            `compiled/readme/index.js`,
          ]),
        ]),
      )

      await this.promise(
        `Building docs`,
        `Built docs`,
        `Failed to build docs`,
        this.cli.run([`@bud`, `docusaurus`, `build`]),
      )
    } catch (error) {
      throw error
    }
  }
}
