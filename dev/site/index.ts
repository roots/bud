import execa from 'execa'
import {writeFileSync} from 'fs-extra'

const BADSTR = [`[2K[1A[2K[1A[2K[G`, /\033/g, /^\n\n\n\n/g, /^\n\n\n\s/g]

const writeOut = (
  args: string[],
  out: string,
  dir = 'examples/babel',
) => {
  const reducer = (a, c) => a.replace(c, '')

  writeFileSync(
    `${process.cwd()}/site/src/components/cli-output/${out}.mdx`,
    BADSTR.reduce(
      reducer,
      execa.sync('yarn', args, {cwd: `${process.cwd()}/${dir}`})
        .stdout,
    ),
  )
}

writeOut(['bud', 'help'], 'help')
writeOut(['bud', 'commands'], 'commands')
writeOut(['bud', 'init', '--help'], 'init--help')
writeOut(['bud', 'dev', '--help'], 'dev--help')
writeOut(['bud', 'extensions', '--help'], 'extensions--help')
writeOut(['bud', 'doctor', '--help'], 'doctor--help')
writeOut(['bud', 'doctor'], 'doctor--success')
writeOut(['bud', 'doctor'], 'doctor--fail', 'examples/react')
writeOut(['bud', 'clean', '--help'], 'clean--help')
writeOut(['bud', 'build'], 'build')
writeOut(['bud', 'build', '--help'], 'build--help')
writeOut(['bud', 'build', '--ci'], 'build--ci')
writeOut(['bud', 'build', '--hash'], 'build--hash')
writeOut(
  ['bud', 'build'],
  'build-multi',
  'examples/multi-compiler',
)
writeOut(
  ['bud', 'build', '--target', 'theme'],
  'build--target-theme',
  'examples/multi-compiler',
)
writeOut(
  ['bud', 'build', '--target', 'theme', '--target', 'plugin'],
  'build--target-theme-plugin',
  'examples/multi-compiler',
)

/**
 * Repeat twice so --cache is demonstrated ;)
 */
writeOut(['bud', 'build', '--cache'], 'build--cache')
writeOut(['bud', 'build', '--cache'], 'build--cache')
