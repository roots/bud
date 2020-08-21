export default {
  babel: true,
  files: ['test/bud/*.js'],
  require: ['ts-node/register'],
  concurrency: 2,
  failFast: true,
  failWithoutAssertions: false,
  verbose: true,
}
