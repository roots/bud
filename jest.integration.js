require('ts-node').register({
  project: require.resolve('./tsconfig.dev.json'),
})

const execa = require('execa')
const {readFile, writeFile} = require('fs-extra')
const {success, log, error} = require('./tests/util/logger')
const {format} = require('prettier')
const globby = require('globby')
const {basename} = require('path/posix')

let refs = {}

const get = async (pkg, file) => {
  refs[pkg] = await readFile(`${pkg}/${file}`, 'utf8')
  success(basename(pkg), 'get')
  return Promise.resolve()
}

const set = async (pkg, file) => {
  await writeFile(
    `${pkg}/${file}`,
    format(refs[pkg], {
      parser: 'json',
    }),
  )

  success(basename(pkg), 'set')
  return Promise.resolve()
}

const pre = async () => {
  log('test', 'Running pre test script')

  let paths = await globby('./examples/*', {
    onlyDirectories: true,
    absolute: true,
  })

  await paths.reduce(async (promise, path) => {
    await promise
    await get(path, 'package.json')
    await set(path, 'package.ref')
    return Promise.resolve()
  }, Promise.resolve())

  return Promise.resolve()
}

const post = async () => {
  log('test', 'Running post test script')

  let paths = await globby('examples/*', {
    onlyDirectories: true,
    absolute: true,
  })

  await paths.reduce(async (promise, path) => {
    await promise
    await get(path, 'package.ref')
    await set(path, 'package.json')
    return Promise.resolve()
  }, Promise.resolve())

  return Promise.resolve()
}

const jest = async suite => {
  const res = execa('yarn', [
    'jest',
    `tests/${suite}`,
    '--verbose',
    '--useStderr',
    '--runInBand',
  ])

  res.stdout.pipe(process.stdout)
  res.stderr.pipe(process.stderr)

  await res

  if (res.exitCode == 0) {
    return Promise.resolve()
  } else {
    await post()
    throw new Error(res.stderr)
  }
}

const run = async () => {
  try {
    await pre()
    await jest('integration')
    await post()

    return Promise.resolve()
  } catch (err) {
    throw new Error(error)
  }
}

run()
