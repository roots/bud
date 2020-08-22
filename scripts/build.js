const execa = require('execa')

const build = async () => {
  await execa('yarn', ['workspace', '@roots/bud-typings', 'build'])
  await execa('yarn', ['build']).stdout.pipe(process.stdout)
}

module.exports = build
