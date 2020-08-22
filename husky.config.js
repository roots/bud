module.exports = {
  hooks: {
    'pre-commit': 'yarn run-s build lint test',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true',
  },
}
