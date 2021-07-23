import execa from 'execa'
import {writeFileSync} from 'fs-extra'

/**
 * Write terminal output to docusaurus mdx
 */
const writeOut = (args: string[], dir = 'babel') => {
  const {stdout, escapedCommand} = execa.sync('yarn', args, {
    cwd: process.cwd().concat('/examples/', dir),
  })

  writeFileSync(
    process.cwd().concat(
      '/site/src/components/cli-output/',
      dir,
      '-',
      escapedCommand
        .replace(/^yarn\sbud\s/, '')
        .replace(/\s--/g, '--')
        .replace(/\s/g, '-'),
      '.md',
    ),
    stdout
      .replace(/^\n/, '')
      .replace(/^\s/, '')
      .replace(/\n$/, '')
      .replace(/\.(css|js)/g, '.$1       ')
      .replace(/minimized/g, 'minimized       '),
  )
}

writeOut(['bud', 'help'])
writeOut(['bud', 'commands'])
writeOut(['bud', 'init', '--help'])
writeOut(['bud', 'dev', '--help'])
writeOut(['bud', 'extensions', '--help'])
writeOut(['bud', 'doctor', '--help'])
writeOut(['bud', 'doctor'])
writeOut(['bud', 'doctor'], 'react')
writeOut(['bud', 'clean', '--help'])
writeOut(['bud', 'build'])
writeOut(['bud', 'build', '--help'])
writeOut(['bud', 'build', '--ci'])
writeOut(['bud', 'build', '--hash'])
writeOut(['bud', 'build'], 'multi-compiler')
writeOut(['bud', 'build', '--target', 'theme'], 'multi-compiler')
writeOut(
  ['bud', 'build', '--target', 'theme', '--target', 'plugin'],
  'multi-compiler',
)

/**
 * Repeat twice so --cache is demonstrated ;)
 */
writeOut(['bud', 'build', '--cache'])
writeOut(['bud', 'build', '--cache'])
