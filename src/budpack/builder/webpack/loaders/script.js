/**
 * Babel
 *
 * @typedef {function} babel
 * @return {object}
 */
const babel = ({bud, loaders}) => {
  const {features: {babel: enabled}} = bud
  const {babel: loader} = loaders
  const options = {
    ...bud.options.babel,
    cacheDirectory: true,
    cacheCompression: bud.inProduction,
  }

  bud.hooks.call('pre_babel', {options, loader, enabled, bud})
  const output = enabled ? [{loader, options}] : []
  bud.hooks.call('post_babel', {output, bud})

  return output
}

/**
 * Typescript
 * @typedef {function}
 */
const typescript = ({bud, loaders}) => {
  const {configs: {typescript: enabled}} = bud
  const {ts: loader} = loaders
  const options = {
    configFile: bud.configs.typescript,
  }

  bud.hooks.call('pre_typescript', {options, loader, enabled, bud})
  const output = enabled ? [{loader, options}]: []
  bud.hooks.call('post_typescript', {output, bud})

  return output
}

/**
 * JS loaders
 *
 * @param {bud} bud
 * @return {object}
 */
const script = bud => {
  const loaders = {
    babel: require.resolve('babel-loader'),
    ts: require.resolve('ts-loader'),
  }

  const output = {
    test: /\.(js|jsx|mjs|ts|tsx)$/,
    include: bud.paths.src,
    exclude: /(node_modules|bower_components)/,
    use: [
      babel,
      typescript,
    ],
  }

  bud.hooks.call('pre_script', {...output, loaders, bud})
  output.use.map(loader => loader({bud, loaders}))
  bud.hooks.call('post_script', {output, bud})

  return output
}

export {script}
