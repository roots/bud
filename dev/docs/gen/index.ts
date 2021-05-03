import fs from 'fs-extra'
import prettier from 'prettier'
import glob from 'globby'
import path from 'path'

import * as remark from './remark'

const doc = ({pkg, basePath}) => {
  glob
    .sync([`${basePath}/src/docs/**/*.md`])

    /**
     * Make destination path
     */
    .map(source => ({
      source,
      destination: source.replace('/src/docs/', '/docs/'),
    }))

    /**
     * Docs transforms / fs
     */
    .map(doc => {
      /**
       * Process md
       */
      const md = remark.fromFile(doc.source, pkg)

      /**
       * Write to /docs
       */
      fs.ensureDirSync(path.dirname(doc.destination))
      fs.writeFileSync(
        doc.destination,
        prettier.format(md, {parser: 'markdown'}),
        'utf8',
      )

      /**
       * Copy README.md to top-level
       */
      doc.destination.includes('README.md') &&
        fs.writeFileSync(
          doc.destination.replace('/docs/', '/'),
          prettier.format(md, {parser: 'markdown'}),
          'utf8',
        )
    })
}

const docs = () => {
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
}

docs()
