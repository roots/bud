import {CommandClass} from 'clipanion'

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
    await this.cli
      .run([`@bud`, `build`])
      .then(
        res =>
          res !== 0 &&
          this.catch(
            new Error(`\`@bud build\` returned error code ${res}`),
          ),
      )
      .catch(this.catch)

    await this.cli
      .run([`workspace`, `@repo/markdown-kit`, `run`, `build`])
      .then(
        res =>
          res !== 0 &&
          this.catch(
            new Error(
              `\`workspace @repo/markdown-kit run build\` returned error code ${res}`,
            ),
          ),
      )
      .catch(this.catch)

    await Promise.all([
      this.cli
        .run([
          `workspace`,
          `@repo/markdown-kit`,
          `exec`,
          `node`,
          `compiled/cli-examples/index.js`,
        ])
        .catch(this.catch),
      this.cli
        .run([
          `workspace`,
          `@repo/markdown-kit`,
          `exec`,
          `node`,
          `compiled/releases/index.js`,
        ])
        .catch(this.catch),
      this.cli
        .run([
          `workspace`,
          `@repo/markdown-kit`,
          `exec`,
          `node`,
          `compiled/readme/index.js`,
        ])
        .catch(this.catch),
    ])

    await this.cli
      .run([`@bud`, `docusaurus`, `build`])
      .then(
        res =>
          res !== 0 &&
          this.catch(
            new Error(
              `\`@bud docusaurus build\` returned error code ${res}`,
            ),
          ),
      )
      .catch(this.catch)
  }
}
