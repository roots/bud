import {resolve} from 'node:path'

export const args: Array<string> = process.argv.slice(2)

const basedirFind = args.findIndex(arg => arg == `--basedir`)

export const basedir =
  basedirFind !== -1
    ? resolve(process.cwd(), args[basedirFind + 1])
    : process.cwd()

export const noDiscovery = args.some(arg => arg === `--no-discovery`)
