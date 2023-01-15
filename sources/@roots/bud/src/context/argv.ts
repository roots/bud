import {join} from 'node:path'

export const argv = process.argv.slice(2)

export const has = (flag: string) => argv.some(arg => arg === `--${flag}`)

export const position = (flag: string) =>
  argv.findIndex(arg => arg === `--${flag}`)

const basedirIndex = has(`cwd`)
  ? position(`cwd`)
  : has(`basedir`)
  ? position(`basedir`)
  : undefined

export const basedir = basedirIndex
  ? join(process.cwd(), argv[basedirIndex + 1])
  : process.cwd()
