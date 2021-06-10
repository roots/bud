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
  log('test', 'Running pre test script')

  let paths = await globby('./examples/*', {
    onlyDirectories: true,
    absolute: true,
  })

  await paths.reduce(async (promise, path) => {
    await promise
    await get(path)
    await set(path)
    return null
  }, Promise.resolve())

  return
})()

async function get(pkg) {
  ref[pkg] = await readFile(`${pkg}/package.json`, 'utf8')

  success(basename(pkg), ref)

  return
}

async function set(pkg) {
  await writeFile(
    `${pkg}/package.ref`,
    format(ref[pkg], {
      parser: 'json',
    }),
  )

  success(
    basename(pkg),
    'save reference to original package.json',
  )

  return
}
