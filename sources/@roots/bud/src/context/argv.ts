import {resolve} from 'node:path'

export const argv = process.argv.slice(2)

export const noDiscovery = argv.some(arg => arg === `--no-discovery`)
const basedirFind = argv.findIndex(arg => arg == `--basedir`)

export const basedir =
  basedirFind !== -1
    ? resolve(process.cwd(), argv[basedirFind + 1])
    : process.cwd()
