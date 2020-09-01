module.exports = {
  babel: {
    testOptions: {
      babelrc: false,
      configFile: false,
    },
  },
  files: ['test/bud*/*.ts'],
  typescript: {
    extensions: ['ts', 'tsx'],
    rewritePaths: {
      'packages/bud/src/': 'packages/bud/lib/',
    },
  },
  nodeArguments: ['--experimental-modules'],
  failFast: true,
  failWithoutAssertions: false,
  verbose: true,
}
