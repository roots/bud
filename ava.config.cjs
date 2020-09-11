module.exports = {
  babel: {
    testOptions: {
      babelrc: false,
      configFile: false,
    },
  },
  files: ['test/bud/bud.ts'],
  typescript: {
    extensions: ['ts', 'tsx'],
    rewritePaths: {
      'packages/bud/src/': 'packages/bud/lib/',
    },
  },
  failFast: true,
  failWithoutAssertions: false,
  verbose: true,
}
