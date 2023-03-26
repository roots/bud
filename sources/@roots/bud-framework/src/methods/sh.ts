import execa, {ExecaChildProcess, Options} from '@roots/bud-support/execa'

import type {Bud} from '../bud.js'

export interface sh {
  (command: string | Array<string>, options?: Options): ExecaChildProcess
}

/**
 * Execute a shell command
 *
 * @example
 * ```js
 * bud.sh(`ls -la`)
 * ```
 */
export const sh: sh = function (
  command: string | Array<string>,
  options = {},
) {
  const bud = this as Bud
  const commandInput = (Array.isArray(command) ? command : [command])
    .map(str => str.split(` `))
    .flat()

  const child = execa(commandInput.shift(), commandInput.filter(Boolean), {
    cwd: bud.context.basedir,
    ...options,
  })

  child.stdout?.pipe(process.stdout)
  child.stderr?.pipe(process.stderr)

  return child
}
