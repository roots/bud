import {CommandClass} from 'clipanion'

import {Command} from './base.command.js'

export class GitHookCommitMsg extends Command {
  public static override paths: CommandClass['paths'] = [
    [`@bud`, `git-hooks`, `commit-msg`],
  ]

  public emoji = {
    chore: `🧹`,
    deps: `📦`,
    docs: `📕`,
    feat: `✨`,
    fix: `🩹`,
    improve: `🔨`,
    merge: `🔀`,
    release: `🚀`,
    test: `🧪`,
  }

  public validator =
    /^(chore|deps|docs|feat|fix|improve|merge|release|test):(none|patch|minor|major)(.*)/

  public exit = (...messages: Array<string>): never => {
    messages.map(message => this.context.stderr.write(`${message}\n`))
    throw new Error(`Invalid commit message`)
  }

  public async execute() {
    const fs = await import(`node:fs/promises`)

    const original = await fs
      .readFile(`./.git/COMMIT_EDITMSG`, `utf8`)
      .catch(this.exit)
      .then(
        message =>
          message
            .split(`\n`)
            .filter(ln => !ln.startsWith(`#`))
            .map(ln => ln.trim())
            .join(`\n`) ?? ``,
      )

    /**
     * Allow for totally empty commit messages
     */
    if (original === `\n`) return

    if (!this.validator.test(original)) {
      this.exit(
        `Invalid commit message format\n`,
        `Message should follow the format: <type>:<severity> <description>\n`,
        `Where <type> is one of: chore, deps, docs, feat, fix, improve, merge, release, test\n`,
        `And <severity> is one of: none, patch, minor, major\n`,
        `Example: feat:minor add new feature`,
      )
    }

    await fs
      .writeFile(
        `./.git/COMMIT_EDITMSG`,
        original.replace(
          this.validator,
          (_, type, sev, desc) =>
            `${this.emoji[type]} ${type}(${sev}):${desc}`,
        ),
        `utf8`,
      )
      .catch(this.exit)
  }
}
