module.exports = {
  hooks: {
    'pre-commit': 'run-s lint',
    'prepare-commit-msg':
      'exec < /dev/tty && git cz --hook || true',
  },
}
