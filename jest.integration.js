require('ts-node').register({
  project: './tsconfig.json',
})

const {globby} = require('@roots/bud-support')
const execa = require('execa')
const {readFile, writeFile} = require('fs-extra')
const {format} = require('prettier')
const {Signale} = require('signale')

const logger = new Signale({
  interactive: false,
})

const pre = async paths => {
  await paths.reduce(async (promise, path) => {
    await promise

    const pkgContents = await readFile(
      `${path}/package.json`,
      'utf8',
    )

    await writeFile(
      `${path}/package.ref`,
      format(pkgContents, {
        parser: 'json',
      }),
    )

    return Promise.resolve()
  }, Promise.resolve())
}

const post = async paths => {
  await paths.reduce(async (promise, path) => {
    await promise

    const pkgContents = await readFile(
      `${path}/package.ref`,
      'utf8',
    )

    await writeFile(
      `${path}/package.json`,
      format(pkgContents, {
        parser: 'json',
      }),
    )

    return Promise.resolve()
  }, Promise.resolve())
}

const jest = async suite => {
  logger.scope(suite).time('run')

  const cmdSegments = [
    'jest',
    `tests/integration/${suite}`,
    '--verbose',
    '--useStderr',
    '--runInBand',
  ]
  if (
    process.argv.includes('--update') ||
    process.argv.includes('-up')
  ) {
    cmdSegments.push('--updateSnapshot')
  }

  const res = execa('yarn', cmdSegments)

  await res

  if (res.exitCode == 0) {
    logger.scope(suite).timeEnd('run')

    return Promise.resolve()
  } else {
    logger.scope(suite).timeEnd('run')

    await post()

    throw new Error(res.stderr)
  }
}

const run = async () => {
  try {
    const paths = await globby.globby('examples/*', {
      cwd: process.cwd(),
      onlyDirectories: true,
      absolute: true,
    })

    logger.info('Integration tests')

    await pre(paths)

    await jest('basic')
    await jest('html-template')
    await jest('babel')
    await jest('api-multi-compiler')
    await jest('node-api')
    await jest('markdown')
    await jest('postcss')
    await jest('preset-recommend')
    await jest('react')
    await jest('emotion')
    await jest('sage')
    await jest('sass')
    await jest('tailwind')
    await jest('vue')
    await jest('imagemin')

    await post(paths)

    logger.success('Complete')
    logger.info(
      'Remember to run yarn install to update lockfile before committing',
    )
    return Promise.resolve()
  } catch (err) {
    logger.error(err)
    throw new Error(err)
  }
}

run()
