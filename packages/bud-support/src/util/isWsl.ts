import os from 'os'

const isWsl = (path: string): boolean =>
  process.platform === 'linux' &&
  path.startsWith('/mnt/') &&
  /Microsoft/i.test(os.release())

export {isWsl as default}
