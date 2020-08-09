const execa = require('execa')

const build = async () => {
  await execa('yarn', ['build']).stdout.pipe(process.stdout)
}

module.exports = build
