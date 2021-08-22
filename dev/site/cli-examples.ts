import {sync as execaSync} from 'execa'
import {writeFileSync} from 'fs-extra'

gen(['bud', 'help'])
gen(['bud', 'commands'])
gen(['bud', 'init', '--help'])
gen(['bud', 'dev', '--help'])
gen(['bud', 'extensions', '--help'])
gen(['bud', 'doctor', '--help'])
gen(['bud', 'doctor'])
gen(['bud', 'doctor'], 'react')
gen(['bud', 'clean', '--help'])
gen(['bud', 'build'])
gen(['bud', 'build', '--help'])
gen(['bud', 'build', '--ci'])
gen(['bud', 'build', '--hash'])
gen(['bud', 'build'], 'multi-compiler')
gen(['bud', 'build', '--target', 'theme'], 'multi-compiler')
gen(
  ['bud', 'build', '--target', 'theme', '--target', 'plugin'],
  'multi-compiler',
)

/**
 * Repeat twice so --cache is demonstrated ;)
 */
gen(['bud', 'build', '--cache'])
gen(['bud', 'build', '--cache'])

/**
 * Write terminal output to docusaurus mdx
 */
function gen(args: string[], dir = 'babel', ver = '') {
  const {stdout, escapedCommand} = execaSync('yarn', args, {
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
      ver ? `-${ver}` : ``,
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
