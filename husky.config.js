module.exports = {
  hooks: {
    'pre-commit': 'yarn run-s lint build test',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
  },
}
