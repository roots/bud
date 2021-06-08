process.on('uncaughtException', () => {})

global.console = Object.keys(global.console).reduce(
  (a, name) => ({
    ...a,
    [name]: jest.fn(),
  }),
  global.console,
)
