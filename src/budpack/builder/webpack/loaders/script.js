const loader = {
  babel: require.resolve('babel-loader'),
  ts: require.resolve('ts-loader'),
}

const test = /\.(js|jsx|mjs|ts|tsx)$/,
  exclude = /(node_modules|bower_components)/

/**
 * Babel
 *
 * @typedef {function} babel
 * @return {object}
 */
const babel = bud => {
  bud.hooks.call('pre_babel', {bud})

  const output = bud.features.babel
    ? [
        {
          loader: loader.babel,
          options: {
            ...bud.options.babel,
            cacheDirectory: true,
            cacheCompression: false,
            compact: bud.inProduction,
          },
        },
      ]
    : []

  bud.hooks.call('post_babel', {bud, output})

  return output
}

/**
 * Typescript
 * @typedef {function}
 */
const typescript = bud => {
  return bud.configs.typescript
    ? [
        {
          loader: loader.ts,
          options: {
            configFile: bud.configs.typescript,
          },
        },
      ]
    : []
}

/**
 * JS loaders
 *
 * @param {bud} bud
 * @return {object}
 */
const script = bud => ({
  test,
  include: bud.paths.src,
  exclude,
  use: [...babel(bud), ...typescript(bud)],
})

export {script}
