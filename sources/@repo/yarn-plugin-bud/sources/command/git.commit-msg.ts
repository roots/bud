#!/usr/bin/env ts-node-script

/**
 * This script is used as a commit-msg Git hook to validate and format commit messages.
 * It checks if the commit message follows a specific format and adds an emoji and additional information to the message.
 * The commit message format should be: <type>:<severity> <description>
 * Where <type> is one of: chore, feat, fix, test, deps
 * And <severity> is one of: none, patch, minor, major
 * Example: feat:minor add new feature
 *
 * @remarks
 * The script exports an empty object to satisfy the requirements of the ES module system.
 */

import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class GitHookCommitMsg extends Command {
  public static code = {
    invalid: 1,
    read: 3,
    write: 2,
  }

  public static emoji = {
    chore: `🧹`,
    deps: `📦`,
    feat: `✨`,
    fix: `🩹`,
    test: `🧪`,
  }

  public static paths: CommandClass['paths'] = [
    [`@bud`, `git-hooks`, `commit-msg`],
  ]

  public validator =
    /^(chore|feat|fix|test|deps):(none|patch|minor|major)(.*)/

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
        `Where <type> is one of: chore, feat, fix, test, deps\n`,
        `And <severity> is one of: none, patch, minor, major\n`,
        `Example: feat:minor add new feature`,
      )
    }

    await fs
      .writeFile(
        `./.git/COMMIT_EDITMSG`,
        original.replace(
          this.validator,
          (_, type, severity, description) => {
            const emoji = GitHookCommitMsg.emoji[type]
            return `${emoji} ${type}(${severity}):${description}`
          },
        ),
        `utf8`,
      )
      .catch(this.exit)
  }
}
