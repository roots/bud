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
import {packages as pkgs} from '../../repo'

pkgs.map(pkg => {
  writeFileSync(
    `${process.cwd()}/packages/${pkg}/README.md`,
    [
      Banner({
        title: pkg.name,
        description: readJsonSync(
          `${process.cwd()}/packages/${pkg}/package.json`,
        ).description,
      }),
      readFileSync(`${process.cwd()}/dev/readme/${pkg}.md`),
      Contributing(),
      Sponsors(),
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
