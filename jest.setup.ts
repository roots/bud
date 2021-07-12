const noop = () => null
process.on('uncaughtException', noop)
