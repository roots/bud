import {paths} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-extra'
import {join} from 'path'
import stripAnsi from 'strip-ansi'

const main = async () => {
  await Promise.all([
    generateMarkdown([`--help`]),
    generateMarkdown([`dev`, `--help`]),
    generateMarkdown([`doctor`, `--help`]),
    generateMarkdown([`clean`, `--help`]),
    generateMarkdown([`build`, `--help`]),
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

  const path = join(
    paths.sources,
    `@repo/docs/src/components/cli-output`,
    name,
  )

  await fs.writeFile(path, content)
}

main()
