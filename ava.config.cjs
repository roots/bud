module.exports = {
  files: ['test/bud/*.js'],
  concurrency: 1,
  failFast: true,
  failWithoutAssertions: false,
  verbose: true,
  nodeArguments: ['--trace-deprecation', '--napi-modules'],
}
