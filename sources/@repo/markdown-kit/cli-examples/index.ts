import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import stripAnsi from 'strip-ansi'

const main = async () => {
  await Promise.all([
    generateMarkdown([`--help`]),
    generateMarkdown([`build`, `--help`]),
    generateMarkdown([`build`, `production`, `--help`]),
    generateMarkdown([`build`, `development`, `--help`]),
    generateMarkdown([`clean`, `--help`]),
    generateMarkdown([`dev`, `--help`]),
    generateMarkdown([`doctor`, `--help`]),
    generateMarkdown([`repl`, `--help`]),
    generateMarkdown([`upgrade`, `--help`]),
    generateMarkdown([`view`, `--help`]),
  ])
}

/**
 * Write terminal output to docusaurus mdx
 */
const generateMarkdown = async (args: string[]) => {
  const {stdout} = await execa(`yarn`, [
    `workspace`,
    `@repo/markdown-kit`,
    `run`,
    `bud`,
    ...args,
  ])

  const content = stripAnsi(stdout)

  const name = args
    .join(`.`)
    .replace(/\--/g, ``) // replace `--` with `.`
    .replace(/^\./, ``) // remove leading `.`
    .concat(`.md`) // add .md extension

  const outFile = path(`sources/@repo/docs/generated/cli`, name)

  await fs.writeAsync(outFile, content)
}

main()
