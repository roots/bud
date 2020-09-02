module.exports = {
  babel: {
    testOptions: {
      babelrc: false,
      configFile: false,
    },
  },
  files: [
    'test/bud/bud.ts',
    'test/bud/container.ts',
    'test/bud/bundle.ts',
    'test/bud/hooks.ts',
  ],
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
