const {join} = require('path')
const {existsSync} = require('fs-extra')

const presetReact = require.resolve('@babel/preset-react')
const presetEnv = [
  require.resolve('@babel/preset-env'),
  {
    modules: false,
    forceAllTransforms: true,
  },
]

const babelPlugins = {
  dynamicImport: require.resolve(
    '@babel/plugin-syntax-dynamic-import',
  ),
  objectRestSpread: require.resolve(
    '@babel/plugin-proposal-object-rest-spread',
  ),
  transformRuntime: [
    require.resolve('@babel/plugin-transform-runtime'),
    {
      helpers: false,
    },
  ],
}

/**
 * Baseline babel configuration
 */
const baseConfig = ({
  react,
  dynamicImport,
  cacheDirectory,
  transformRuntime,
}) => {
  const presets = [presetEnv]
  react && presets.push(presetReact)

  const plugins = []
  dynamicImport && plugins.push(babelPlugins.dynamicImport)
  transformRuntime &&
    plugins.push(babelPlugins.transformRuntime)

  return {
    cacheDirectory,
    presets,
    plugins,
  }
}

/**
 * Get project babel.config.js
 *
 * @return {object}
 */
const projectConfigValues = () => {
  const file = join(process.cwd(), 'babel.config.js')
  const fileExists = existsSync(file)

  return fileExists ? require(file) : {}
}

/**
 * Babel config
 *
 * @prop   {object} api bud.config
 * @return {object}
 */
const babel = ({
  react = false,
  dynamicImport = true,
  cacheDirectory = true,
  transformRuntime = false,
  config = {},
}) => ({
  ...baseConfig({
    react,
    dynamicImport,
    cacheDirectory,
    transformRuntime,
  }),
  ...projectConfigValues,
  ...config,
})

module.exports = babel
