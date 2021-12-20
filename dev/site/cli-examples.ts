import execa from 'execa'
import {writeFile} from 'fs-extra'
import {join} from 'path'

const main = async () => {
  await Promise.all([
    generateMarkdown(['bud', '--help']),
    generateMarkdown(['bud', 'install', '--help']),
    generateMarkdown(['bud', 'dev', '--help']),
    generateMarkdown(['bud', 'doctor', '--help']),
    generateMarkdown(['bud', 'clean', '--help']),
    generateMarkdown(['bud', 'build', '--help']),
  ])
}

/**
 * Write terminal output to docusaurus mdx
 */
const generateMarkdown = async (
  args: string[],
  dir = 'babel',
) => {
  const {stdout} = await execa('yarn', args, {
    cwd: join(process.cwd(), 'examples', dir),
  })

  const content = stdout
    .replaceAll(/^\n/g, '') // remove leading newlines
    .replaceAll(/^\s/g, '') // remove leading whitespace
    .replaceAll(/\n$/g, '') // remove trailing newlines

  const name = args
    .join('.')
    .replaceAll(/^yarn\sbud\s/g, '') // remove `yarn bud`
    .replaceAll(/\--/g, '') // replace `--` with `.`
    .replace(/^\./, '') // remove leading `.`
    .concat('.md') // add .md extension

  const path = join(
    process.cwd(),
    'site/src/components/cli-output',
    name,
  )

  await writeFile(path, content)
}

main()
