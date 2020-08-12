module.exports = {
  files: ['test/bud/*.js'],
  concurrency: 5,
  failFast: true,
  failWithoutAssertions: false,
  verbose: true,
  nodeArguments: ['--trace-deprecation', '--napi-modules'],
}
