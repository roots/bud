const banner = require('./components/banner')
const footer = require('./components/footer')
const {readFileSync, writeFileSync} = require('fs-extra')
const {format} = require('prettier')
const {sync: glob} = require('globby')
const {join} = require('path')

const readme = ({pkg, from, to}) => {
  writeFileSync(
    to,
    format(
      `${banner(pkg)}\n${readFileSync(from)}${footer}`.replace(
        new RegExp(/\[\[base\]\]/, 'g'),
        'https://github.com/roots/bud/tree/stable',
      ),
      {
        parser: 'markdown',
      },
    ),
    'utf8',
  )
}

const pkgNameFromPkgPath = path =>
  path
    .split('packages/')
    .pop()
    .replace('/src/docs/README.md', '')

glob(['packages/@roots/*/src/docs/README.md']).map(from => {
  readme({
    pkg: pkgNameFromPkgPath(from),
    from: from,
    to: from.replace(`src/docs/README.md`, `README.md`),
  })
})

readme({
  pkg: '@roots/bud',
  from: join(
    process.cwd(),
    'packages/@roots/bud/src/docs/README.md',
  ),
  to: join(process.cwd(), 'README.md'),
})
