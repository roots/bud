#!/usr/bin/env node

const {execa} = require('@roots/bud-support')
const {preflight, isStatic, json, api} = require('../lib/cjs')

/**
 * Execa options
 */
const options = {shell: true, cwd: process.cwd()}

/**
 * Router
 */
const route = async () => {
  switch (process.argv[2]) {
    case 'build':
      return await build()

    case 'build:production':
      return await production()

    case 'clean':
      return await clean()

    case 'clean:dist':
      return await cleanDist()

    case 'clean:cache':
      return await cleanStorage()

    case 'clean:views':
      return await cleanViews()

    case 'lint':
      return await lint()

    case 'lint:scripts':
      return await lintScripts()

    case 'lint:styles':
      return await lintStyles()

    case 'prettier':
      return await prettier()

    case 'translate':
      return await translate()

    case 'translate:pot':
      return await translatePot()

    case 'translate:js':
      return await translateJs()

    default:
  }
}

/**
 * Compile sage
 */
const build = async () => {
  preflight()
  isStatic() ? json() : api()
}

/**
 * Clean dist
 */
const cleanDist = async () => {
  return await execa.command(`yarn rimraf dist/*`, options)
}

/**
 * Clean cache
 */
const cleanStorage = async () => {
  return await execa.command(
    `yarn rimraf 'storage/framework/cache/*php' \
    'storage/framework/cache/data/*.php' \
    'storage/bud/*'`,
    options,
  )
}

/**
 * Clean views
 */
const cleanViews = async () => {
  return await execa.command(
    `rimraf 'storage/framework/views/*.php'`,
    options,
  )
}

/**
 * Clean all
 */
const clean = async () => {
  await cleanDist()
  await cleanStorage()
  await cleanViews()
  return
}

/**
 * Eslint
 */
const lintScripts = async () => {
  return await execa.command(
    `yarn eslint 'resources/assets/scripts'`,
    options,
  )
}

/**
 * Styleint
 */
const lintStyles = async () => {
  return await execa.command(
    `yarn stylelint \
    'resources/assets/**/*.{vue,css,sass,scss,less}'`,
    options,
  )
}

/**
 * Lint all
 */
const lint = async () => {
  await lintScripts()
  await lintStyles()
  await prettier()
}

/**
 * prettier
 */
const prettier = async () => {
  return await execa.command(`yarn prettier --write .`, options)
}

/**
 * wp i18n
 */
const translatePot = async () => {
  return await execa.command(
    'wp i18n make-pot ./resources/languages --no-purge --pretty-print',
    options,
  )
}

/**
 * wp i18n js
 */
const translateJs = async () => {
  return await execa.command(
    `wp i18n make-json . \
    ./resources/languages/sage.pot \
    --ignore-domain \
    --include="app,resources/assets,resources/views"`,
    options,
  )
}

/**
 * wp i18n all
 */
const translate = async () => {
  await translatePot()
  await translateJs()
}

/**
 * production
 */
const production = async () => {
  await cleanDist()
  await cleanStorage()
  await build()
}

/**
 * Run handler
 */
route()
