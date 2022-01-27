import {paths} from '@repo/constants'
import execa from 'execa'
import {writeFile} from 'fs-extra'
import {join} from 'path'

const main = async () => {
  await Promise.all([
    generateMarkdown(['--help']),
    generateMarkdown(['install', '--help']),
    generateMarkdown(['dev', '--help']),
    generateMarkdown(['doctor', '--help']),
    generateMarkdown(['clean', '--help']),
    generateMarkdown(['build', '--help']),
  ])
}

/**
 * Write terminal output to docusaurus mdx
 */
const generateMarkdown = async (args: string[], dir = 'babel') => {
  const {stdout} = await execa('yarn', [
    `workspace`,
    `@repo/markdown-kit`,
    `run`,
    `bud`,
    ...args,
    `--location.project`,
    `${paths.sources}/@repo/markdown-kit`,
  ])

  const content = stdout
    .replaceAll(/^\n/g, '') // remove leading newlines
    .replaceAll(/^\s/g, '') // remove leading whitespace
    .replaceAll(/\n$/g, '') // remove trailing newlines
    .replaceAll(`${process.cwd()}`, '[REDACTED]', 'g') // remove path

  const name = args
    .join('.')
    .replaceAll(/\--/g, '') // replace `--` with `.`
    .replace(/^\./, '') // remove leading `.`
    .concat('.md') // add .md extension

  const path = join(paths.sources, '@repo/docs/src/components/cli-output', name)

  await writeFile(path, content)
}

main()
