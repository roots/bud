const execa = require('execa')
const sane = require('sane')
const fs = require('fs-extra')
const chalk = require('chalk')

var RUNNING = false

const watcher = sane(
  ...[
    process.cwd(),
    {glob: ['packages/*/src/**/*.ts'], poll: true},
  ],
)

const run = async filepath => {
  const packageRoot = filepath.split('/').splice(0, 2).join('/')
  const pkg = await fs.readJson(`${packageRoot}/package.json`)

  if (!pkg?.name)
    return console.log(`${pkgName}? I don't know em!`)

  console.log(chalk.green(`\nRebuilding ${pkg.name}\n`))

  await execa('yarn', [
    'workspace',
    pkg.name,
    'build',
  ]).stdout.pipe(process.stdout)
}

watcher.on('ready', function () {
  console.log('ready')
})

watcher.on('change', async (filepath, root, stat) => {
  if (RUNNING == true) return

  RUNNING = true
  run(filepath)
  RUNNING = false
})

watcher.on('add', function (filepath, root, stat) {
  console.log('file added', filepath)
})

watcher.on('delete', function (filepath, root) {
  console.log('file deleted', filepath)
})
