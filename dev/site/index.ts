import globby from 'globby'
import {copyFileSync, writeFileSync} from 'fs-extra'
import execa from 'execa'

globby.sync(`${process.cwd()}/site/docs/*`).map(path => {
  copyFileSync(
    path,
    path.replace(
      `${process.cwd()}/site/docs/`,
      `${process.cwd()}/packages/@roots/bud-api/docs/`,
    ),
  )
})

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/help.mdx`,
  execa
    .sync('yarn', ['bud', 'help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `


`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build.mdx`,
  execa
    .sync('yarn', ['bud', 'build'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build--hash.mdx`,
  execa
    .sync('yarn', ['bud', 'build', '--hash'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build--cache.mdx`,
  (() => {
    execa.sync('yarn', ['bud', 'build', '--cache'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    return execa
      .sync('yarn', ['bud', 'build', '--cache'], {
        cwd: `${process.cwd()}/examples/babel`,
      })
      .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
      .replace(
        `



`,
        '',
      )
  })(),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build-multi.mdx`,
  execa
    .sync('yarn', ['bud', 'build'], {
      cwd: `${process.cwd()}/examples/multi-compiler`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build--target-theme.mdx`,
  (() => {
    return execa
      .sync('yarn', ['bud', 'build', '--target', 'theme'], {
        cwd: `${process.cwd()}/examples/multi-compiler`,
      })
      .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
      .replace(
        `



`,
        '',
      )
  })(),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build--target-theme-plugin.mdx`,
  (() => {
    return execa
      .sync(
        'yarn',
        [
          'bud',
          'build',
          '--target',
          'theme',
          '--target',
          'plugin',
        ],
        {
          cwd: `${process.cwd()}/examples/multi-compiler`,
        },
      )
      .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
      .replace(
        `



`,
        '',
      )
  })(),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build--ci.mdx`,
  execa
    .sync('yarn', ['bud', 'build', '--ci'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(
      `\n
  [2K[1A[2K[1A[2K[G\n`,
      '',
    )
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/commands.mdx`,
  execa
    .sync('yarn', ['bud', 'commands'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/build--help.mdx`,
  execa
    .sync('yarn', ['bud', 'build', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/init--help.mdx`,
  execa
    .sync('yarn', ['bud', 'init', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/dev--help.mdx`,
  execa
    .sync('yarn', ['bud', 'dev', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/extensions--help.mdx`,
  execa
    .sync('yarn', ['bud', 'extensions', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/extensions:install--help.mdx`,
  execa
    .sync('yarn', ['bud', 'extensions:install', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/doctor--help.mdx`,
  execa
    .sync('yarn', ['bud', 'doctor', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `


`,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/doctor--fail.mdx`,
  execa
    .sync('yarn', ['bud', 'doctor'], {
      cwd: `${process.cwd()}/examples/react`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `


 `,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/doctor--success.mdx`,
  execa
    .sync('yarn', ['bud', 'doctor'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `


 `,
      '',
    ),
  {encoding: 'utf8'},
)

writeFileSync(
  `${process.cwd()}/site/src/components/cli-output/clean--help.mdx`,
  execa
    .sync('yarn', ['bud', 'clean', '--help'], {
      cwd: `${process.cwd()}/examples/babel`,
    })
    .stdout.replace(`[2K[1A[2K[1A[2K[G`, '')
    .replace(
      `



`,
      '',
    ),
  {encoding: 'utf8'},
)
