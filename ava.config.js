export default {
  babel: true,
  files: ['test/{bud,bud-*}/*'],
  typescript: {
    extensions: ['ts', 'tsx'],
    rewritePaths: {
      'src/': 'build/',
    },
  },
  require: ['ts-node/register'],
  concurrency: 2,
  failFast: true,
  failWithoutAssertions: false,
  verbose: true,
}
