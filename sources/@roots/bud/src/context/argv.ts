import {resolve} from 'node:path'

export const argv = process.argv.slice(2)

export const flag = (flag: string) => argv.some(arg => arg === `--${flag}`)

export const notFlag = (flag: string) =>
  argv.every(arg => arg !== `--${flag}`)

export const flagIndex = (flags: string) =>
  argv.findIndex(arg => arg === flags)

const basedirIndex = flag(`--cwd`)
  ? flagIndex(`--cwd`)
  : flag(`--basedir`)
  ? flagIndex(`--basedir`)
  : false
export const basedir = basedirIndex
  ? resolve(process.cwd(), argv[basedirIndex + 1])
  : process.cwd()
