const api = require('./api')
const path = require('path')

const resolve = relPath => relPath
  ? path.join(bud.options.project, relPath)
  : bud.options.project

const dev = dev => {
  bud.options.dev = {
    ...bud.options.dev,
    ...dev,
  }
  return bud
}

const watchTimeout = timeout => {
  bud.options.dev.watchOptions.aggregateTimeout = timeout
  return bud
}

const dist = path => {
  bud.options.dist = path
  return bud
}

const project = path => {
  bud.options.project = path
  return bud
}

const alias = alias => {
  bud.options.alias = alias
  return bud
}

const babel = settings => {
  bud.options.babel = api.babel(settings)
  return bud
}

const entry = (chunk, entry) => {
  bud.options.entry = {
    ...bud.options.entry,
    [`${chunk}`]: entry,
  }
  return bud
}

const postcss = ({enabled = bud.options.postcss}) => {
  bud.options.postcss = api.postcss({
    budpack: bud.options.budpack,
    project: bud.options.project,
    enabled: enabled,
  })
  return bud
}

const eslint = ({enabled = bud.options.eslint}) => {
  bud.options.eslint = api.eslint({
    budpack: bud.options.budpack,
    project: bud.options.project,
    enabled: enabled,
  })
  return bud
}

const wpManifest = settings => {
  bud.options.wpManifest = {
    ...bud.options.wpManifest,
    ...settings,
  }
  return bud
}

const hash = state => {
  bud.options.hashed = state
  return bud
}
const maps = state => {
  bud.options.mapped = state
  return bud
}
const mini = state => {
  bud.options.minified = state
  return bud
}
const hot = state => {
  bud.options.hot = state
  return bud
}
const watch = state => {
  bud.options.watching = state
  return bud
}

const inProduction = true
const inDevelopment = false

const options = {
  project: process.cwd(),
  dist: 'dist',
  budpack: path.resolve(__dirname, './../..'),
  dev: {
    host: 'localhost',
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
    hot,
    watchOptions: {
      aggregateTimeout: 300,
    },
  },
  wpManifest: {
    useDefaults: true,
    injectPolyfill: false,
    outputFormat: 'json',
  },
  entry: {},
  inProduction,
  inDevelopment,
  watching: inDevelopment,
  hot: inDevelopment,
  mapped: inProduction,
  hashed: inProduction,
  minified: inProduction,
}
options.eslint = api.eslint({
  budpack: options.budpack,
  project: options.project,
  enabled: true,
})
options.postcss = api.postcss({
  budpack: options.budpack,
  project: options.project,
  enabled: true,
})

const bud = {
  project,
  dist,
  alias,
  babel,
  dev,
  entry,
  eslint,
  hash,
  maps,
  mini,
  postcss,
  watchTimeout,
  resolve,
  options,
  inProduction,
  inDevelopment,
  watch,
  hot,
  wpManifest,
}

module.exports = bud
