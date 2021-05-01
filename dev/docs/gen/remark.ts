import vfile from 'to-vfile'
import remark from 'remark'
import toc from 'remark-toc'
import emoji from 'remark-emoji'
import git from 'remark-github'
import {transform} from './templates'
import _ from 'lodash'

const parseFile = filePath => vfile.readSync(filePath)

const fromFile = (srcFile, pkg) => {
  let res


  const replacements = [
    [
      /docs`(.*?)`/g,
      `https://github.com/roots/bud/tree/stable/docs/$1.md`
    ],
    [
      /github`(.*?)`/g,
      'https://github.com/$1'
    ],
    [
      /npm`(.*?)`/g,
      '![npm](https://img.shields.io/npm/v/$1.svg?color=%23525ddc&style=flat-square)',
    ],
    [
      /readme`(.*?)`/g,
      `[📚 README](https://github.com/roots/bud/tree/stable/packages/$1/README.md)`,
    ],
    [
      /`(\@roots\/.*?)`/g,
      `[**$1**](https://github.com/roots/bud/tree/stable/packages/$1)`,
    ],
  ]

  const mdv = parseFile(srcFile)

  mdv.contents = mdv.contents.toString() as string

  replacements.forEach(([f, r]) => {
    mdv.contents = mdv.contents.replace(f, r)
  })

  mdv.contents = Buffer.from(mdv.contents)

  remark()
    .use(toc)
    .use(git, { repo: 'git@github.com:roots/bud' })
    .use(emoji)
    .process(mdv, (err, file) => {
      err && console.error(err)
      res = file.contents
    })

  return transform(
    pkg,
    srcFile,
    res,
  )
}

export {parseFile, fromFile}
