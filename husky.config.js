module.exports = {
  hooks: {
    'pre-commit': 'yarn run-s lint make test',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
  },
}
