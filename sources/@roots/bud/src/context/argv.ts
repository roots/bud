import {resolve} from 'path'

export const args: Array<string> = process.argv.slice(2)

const basedirFind = args.findIndex(arg => arg == `--basedir`)

export const basedir =
  basedirFind !== -1
    ? resolve(process.cwd(), args[basedirFind + 1])
    : process.cwd()

export const noContextCache = args.some(
  arg => arg === `--no-context-cache`,
)

export const clearContextCache = args.some(
  arg => arg === `--clear-context-cache`,
)

export const noDiscovery = args.some(arg => arg === `--no-discovery`)
