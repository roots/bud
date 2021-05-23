import fs from 'fs-extra'
import prettier from 'prettier'
import glob from 'globby'
import path from 'path'

import * as remark from './remark'

const doc = (set, rootReadme = false) => {
  set.map(doc => {
    const md = remark.fromFile(doc.source, doc.pkg)
    const output = prettier.format(md, {parser: 'markdown'})

    fs.ensureDirSync(path.dirname(doc.destination))

    fs.writeFileSync(doc.destination, output, 'utf8')

    rootReadme &&
      doc.destination.includes('README.md') &&
      fs.writeFileSync(
        doc.destination.replace('/docs/', '/'),
        output,
        'utf8',
      )
  })
}

const docs = () => {
  const pkgs = glob.sync([
    `${process.cwd()}/packages/@roots/*/package.json`,
  ])

  glob
    .sync(pkgs)
    .map(source => ({
      pkg: fs.readJsonSync(source),
      source: source.replace(
        '/package.json',
        '/src/docs/**/*.md',
      ),
    }))
    .forEach(origin => {
      doc(
        glob.sync([origin.source]).map(source => ({
          pkg: origin.pkg,
          destination: source.replace('src/docs', 'docs'),
          source,
        })),
        true,
      )
    })

  doc(
    glob
      .sync([`${process.cwd()}/dev/docs/src/pages/**/*.md`])
      .map(source => ({
        pkg: null,
        source,
        destination: source.replace(
          '/dev/docs/src/pages/',
          '/docs/',
        ),
      })),
  )

  doc(
    glob
      .sync([`${process.cwd()}/packages/bud-cli/src/README.md`])
      .map(source => ({
        pkg: null,
        source,
        destination: `${process.cwd()}/docs/cli.md`,
      })),
  )

  doc(
    glob
      .sync([
        `${process.cwd()}/packages/@roots/bud-api/src/docs/*.md`,
      ])
      .map(source => ({
        pkg: null,
        source,
        destination: source.replace(
          '/packages/@roots/bud-api/src/docs/',
          '/docs/config/',
        ),
      })),
  )

  fs.copyFile(
    `${process.cwd()}/packages/@roots/bud/README.md`,
    `${process.cwd()}/README.md`,
  )
}

docs()
