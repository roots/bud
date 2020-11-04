const execa = require('execa')
const sane = require('sane')
const fs = require('fs-extra')
const chalk = require('chalk')

const derivePkg = async filepath => {
  const dir = filepath.split('/').splice(0, 2).join('/')
  return await fs.readJson(`${dir}/package.json`)
}

const run = async filepath => {
  const pkg = await derivePkg(filepath)

  console.log(chalk.green(`\nRebuilding ${pkg.name}\n`))

  try {
    const {stdout} = await execa('yarn', [
      'workspace',
      pkg.name,
      'build',
    ])

    stdout && console.log('Done')
  } catch (err) {
    console.error(chalk.red(err.stderr))
  }

  return false
}

sane(process.cwd(), {
  glob: ['packages/*/src/**/*.ts'],
  poll: true,
})
  .on('change', run)
  .on('add', run)
  .on('delete', run)
  .on('ready', () => console.log('Ready friendo'))
