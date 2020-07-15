const loader = require.resolve('ts-loader'),
  babelLoader = require.resolve('babel-loader'),
  test = /\.(ts|tsx)$/,
  exclude = /node_modules/

/**
 * Typescript loader
 */
const typescript = ({typescript}) => ({
  test,
  exclude,
  use: [
    babelLoader,
    {
      loader,
      options: {
        ...typescript,
        transpileOnly: true,
      },
    },
  ],
})

export {typescript}
