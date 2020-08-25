const execa = require('execa')
const {join} = require('path')
const lerna = require('../lerna.json')

lerna.packages.forEach(pkg => {
  const dir = join(process.cwd(), pkg)
  const {name, private} = require(join(dir, 'package.json'))

  if (! private && name !== '@roots/bud') {
    console.log(`Publishing ${name}`)
    execa.sync('npm', [
      'publish',
      '--tag',
      'next',
    ], {
      cwd: dir,
    })
  }
})
