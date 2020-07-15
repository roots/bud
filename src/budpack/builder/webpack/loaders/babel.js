const loader = require.resolve('babel-loader'),
  test = /\.(js|mjs|jsx|ts|tsx)$/,
  exclude = /node_modules/

/**
 * Babel loader
 */
const babel = ({babel}, paths) => ({
  test,
  include: paths.src,
  exclude,
  loader,
  options: {
    ...babel,
    cacheDirectory: true,
    cacheCompression: false,
    compact: process.env.NODE_ENV == 'production',
  },
})

export {babel}
