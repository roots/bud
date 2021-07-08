import {
  copyFileSync,
  readFileSync,
  readJsonSync,
  writeFileSync,
} from 'fs-extra'
import globby from 'globby'
import Banner from '../../site/src/components/readme/Banner'
import Sponsors from '../../site/src/components/readme/Sponsors'
import Contributing from '../../site/src/components/readme/Contributing'
import Community from '../../site/src/components/readme/Community'
import project from '../../repo'

project.packages.map(pkg => {
  writeFileSync(
    `${process.cwd()}/packages/${pkg}/README.md`,
    [
      Banner({
        title: pkg,
        description: readJsonSync(
          `${process.cwd()}/packages/${pkg}/package.json`,
        ).description,
        logo: project.logo,
      }),
      readFileSync(`${process.cwd()}/dev/readme/${pkg}.md`),
      Contributing(),
      Sponsors(),
      Community(),
    ].join('\n'),
  )
})

globby.sync(`${process.cwd()}/site/docs/*`).map(path => {
  copyFileSync(
    path,
    path.replace(
      `${process.cwd()}/site/docs/`,
      `${process.cwd()}/packages/@roots/bud-api/docs/`,
    ),
  )
})

copyFileSync(
  `${process.cwd()}/packages/@roots/bud/README.md`,
  `${process.cwd()}/README.md`,
)
