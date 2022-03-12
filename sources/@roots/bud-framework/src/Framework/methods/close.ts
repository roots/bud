import {chalk} from '@roots/bud-support'

import {Framework} from '..'

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export interface close {
  (done?: CallableFunction): Promise<void>
}

/**
 * Exit the program
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export async function close(callback: any) {
  const ctx = this as Framework

  global.process.exitCode === 0
    ? process.stdout.write(chalk.green(`\n✔ that's a wrap\n`))
    : process.stderr.write(chalk.red(`\n✖ Error\n`))

  await ctx.hooks.fire('event.app.close')
  callback()
}
