import fs from 'fs-extra'
import prettier from 'prettier'
import glob from 'globby'
import path from 'path'

import * as remark from './remark.mjs'
import * as templates from './templates/index.mjs'

const replacements = [
  [
    new RegExp(/\[\[base\]\]/, 'g'),
    'https://github.com/roots/bud/tree/stable',
  ],
]

const doc = ({pkg, basePath}) => {
  glob
    .sync([`${basePath}/src/docs/**/*.md`])
    .map(source => ({
      source,
      destination: source.replace('/src/docs/', '/docs/'),
    }))
    .map(doc => {
      fs.ensureDirSync(path.dirname(doc.destination))

      const md = templates.transform(
        pkg,
        doc.source,
        remark.fromFile(doc.source),
        replacements,
      )

      fs.writeFileSync(
        doc.destination,
        prettier.format(md, {parser: 'markdown'}),
        'utf8',
      )
    })
}

glob
  .sync([`${process.cwd()}/packages/@roots/*/package.json`])
  .map(from =>
    doc({
      pkg: fs.readJsonSync(from),
      basePath: from.replace('/package.json', ''),
    }),
  )

fs.copyFile(
  `${process.cwd()}/packages/@roots/bud/README.md`,
  `${process.cwd()}/README.md`,
)
