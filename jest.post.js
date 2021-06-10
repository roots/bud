require('ts-node').register({
  project: require.resolve('./tsconfig.dev.json'),
})

const {readFile, writeFile} = require('fs-extra')
const {success, log} = require('./tests/util/logger')
const {format} = require('prettier')
const globby = require('globby')
const {basename} = require('path/posix')

let ref = {}

;(async () => {
  log('test', 'Running post test script')

  let paths = await globby('examples/*', {
    onlyDirectories: true,
    absolute: true,
  })

  await paths.reduce(async (promise, path) => {
    await promise
    await get(path)
    await set(path)
    return null
  }, Promise.resolve())
})()

async function get(pkg) {
  ref[pkg] = await readFile(`${pkg}/package.ref`, 'utf8')
  success(basename(pkg), 'get reference package.json')
  return
}

async function set(pkg) {
  await writeFile(
    `${pkg}/package.json`,
    format(packages[pkg], {
      parser: 'json',
    }),
  )

  success(basename(pkg), 'Restored original package.json')
  return
}
