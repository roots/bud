export const args: Array<string> = process.argv.slice(2)

const basedirFind = args.findIndex(arg => arg == `--basedir`)
export const basedir =
  basedirFind !== -1 ? args[basedirFind + 1] : process.cwd()

export const noContextCache =
  args.findIndex(arg => arg === `--no-context-cache`) !== -1

export const clearContextCache =
  args.findIndex(arg => arg === `--clear-context-cache`) !== -1
