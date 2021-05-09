import fs from 'fs-extra'
import prettier from 'prettier'
import glob from 'globby'
import path from 'path'

import * as remark from './remark'

const doc = (set) => {
  set.map(doc => {
    console.log(doc)

    const md = remark.fromFile(doc.source, doc.pkg)

    fs.ensureDirSync(path.dirname(doc.destination))
    
    fs.writeFileSync(
      doc.destination,
      prettier.format(md, {parser: 'markdown'}),
      'utf8',
    )

    doc.pkg && doc.destination.includes('README.md') &&
      fs.writeFileSync(
        doc.destination.replace('/docs/', '/'),
        prettier.format(md, {parser: 'markdown'}),
        'utf8',
      )
  })
}

const docs = () => {
  const pkgs = glob
    .sync([`${process.cwd()}/packages/@roots/*/package.json`])

    glob.sync(pkgs)
    .map(source => ({
      pkg: fs.readJsonSync(source),
      source: source.replace('/package.json', '/src/docs/**/*.md'),
    })).forEach(origin => {
      doc(
        glob.sync([origin.source])
          .map(source => ({
            pkg: origin.pkg,
            destination: source.replace('src/docs', 'docs'),
            source,
          }))
      )
    })

  doc(
    glob.sync([`${process.cwd()}/dev/docs/src/pages/**/*.md`])
      .map(source => ({
        pkg: null,
        source,
        destination: source.replace('/dev/docs/src/pages/', '/docs/'),
      }))
  )

  fs.copyFile(
    `${process.cwd()}/packages/@roots/bud/README.md`,
    `${process.cwd()}/README.md`,
  )
}

docs()
