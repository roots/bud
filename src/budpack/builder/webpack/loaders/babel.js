const loader = {
  babel: require.resolve('babel-loader'),
  ts: require.resolve('ts-loader'),
}

const test = /\.(js|mjs|jsx|ts|tsx)$/,
  exclude = /node_modules/

/**
 * Babel loader
 */
const babel = ({babel}, paths, configs) => ({
  test,
  include: paths.src,
  exclude,
  use: [
    {
      loader: loader.babel,
      options: {
        ...babel,
        cacheDirectory: true,
        cacheCompression: false,
        compact: process.env.NODE_ENV == 'production',
      },
    },
    ...(configs.typescript
      ? [
          {
            loader: loader.ts,
            options: {
              configFile: configs.typescript,
            },
          },
        ]
      : []),
  ],
})

export {babel}
