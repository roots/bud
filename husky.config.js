module.exports = {
  hooks: {
    'pre-commit': 'run-s lint make test',
    'prepare-commit-msg':
      'exec < /dev/tty && git cz --hook || true',
  },
}
