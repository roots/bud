import vfile from 'to-vfile'
import remark from 'remark'
import toc from 'remark-toc'
import emoji from 'remark-emoji'
import github from 'remark-github'
import path from 'path'
import glob from 'globby'

const pkgs = glob
  .sync([`${process.cwd()}/packages/@roots/*/package.json`])
  .map(path.dirname)
  .reduce((a, pkgPath) => {
    const pkg = pkgPath.split('/').pop()
    return [
      ...a,
      [
        `[dir](${pkg})`,
        `[**@roots/${pkg}**](https://github.com/roots/bud/tree/stable/packages/roots/${pkg}/README.md)`,
      ],
      [
        `[readme](${pkg})`,
        `[**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/${pkg}/README.md)`,
      ],
      [
        `[pkg](${pkg})`,
        `![npm](https://img.shields.io/npm/v/@roots/${pkg}.svg?color=%23525ddc&style=flat-square)`,
      ],
    ]
  }, [])

const parseFile = filePath => vfile.readSync(filePath)

const fromFile = src => {
  let res

  remark()
    .use(github, {repository: 'roots/bud'})
    .use(toc)
    .use(emoji)
    .process(parseFile(src), (err, file) => {
      err && console.error(err)
      res = String(file)
    })

  pkgs.map(([f, r]) => {
    res = res.replaceAll(f, r)
  })

  return res
}

export {parseFile, fromFile}
