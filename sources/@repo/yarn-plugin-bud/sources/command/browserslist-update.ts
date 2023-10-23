import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {execa} from 'execa'
import * as fs from 'fs-jetpack'
import {kebabCase} from 'lodash'

import {Command} from './base.command'

export class BrowserslistUpdate extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `browserslist`, `update`],
    [`@bud`, `browserslist`, `upgrade`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `update browserslist`,
    examples: [
      [`browserslist usage info`, `yarn @bud browserslist --help`],
    ],
  }

  public static queries: Array<[string, Array<string>]> = [
    [`Default`, []],
    [`Last 2 versions`, [`last 2 versions`]],
    [`Last 3 versions`, [`last 3 versions`]],
    [
      `WordPress`,
      [
        `> 1%`,
        `last 1 Android versions`,
        `last 1 ChromeAndroid versions`,
        `last 2 Chrome versions`,
        `last 2 Firefox versions`,
        `last 2 Safari versions`,
        `last 2 iOS versions`,
        `last 2 Edge versions`,
        `last 2 Opera versions`,
      ],
    ],
  ]

  public async execute() {
    this.context.stdout.write(`Updating browserslist...\n`)

    await execa(`yarn`, [`browserslist`, `--update-db`]).catch(this.catch)

    this.context.stdout.write(`Updating queries...\n`)

    await Promise.all(
      BrowserslistUpdate.queries.map(
        async ([name, query]) => await this.updateQuery(name, query),
      ),
    ).catch(this.catch)
  }

  public async updateQuery(name: string, query: Array<string>) {
    const list = await execa(`yarn`, [`browserslist`, query.join(`, `)])
      .then(({stdout}) => stdout)
      .catch(this.catch)

    if (!list) return

    const parts = []

    // banner
    parts.push(`/**\n * ${name}\n */\n`)
    // opening module.exports statement
    parts.push(`module.exports = [\n`)
    // each line from stdout
    list.split(`\n`).map(item => parts.push(`  \`${item}\`,\n`))
    // closing bracket
    parts.push(`]`)

    // file name
    const filename = `${kebabCase(name.toLowerCase())}.cjs`
    // file path
    const writePath = path(
      `sources`,
      `@roots`,
      `browserslist-config`,
      filename,
    )
    // file contents
    const contents = parts.join(``)

    // write output
    await fs.writeAsync(writePath, contents).catch(this.catch)

    // log
    this.context.stdout.write(`Updated ${filename}\n`)
  }
}
