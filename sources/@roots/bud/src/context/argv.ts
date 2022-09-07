import {resolve} from 'path'

export const args: Array<string> = process.argv.slice(2)

const basedirFind = args.findIndex(arg => arg == `--basedir`)

export const basedir =
  basedirFind !== -1
    ? resolve(process.cwd(), args[basedirFind + 1])
    : process.cwd()

export const noContextCache =
  args.findIndex(arg => arg === `--no-context-cache`) !== -1

export const clearContextCache =
  args.findIndex(arg => arg === `--clear-context-cache`) !== -1

export const noDiscovery =
  args.findIndex(arg => arg === `--no-discovery`) !== -1
