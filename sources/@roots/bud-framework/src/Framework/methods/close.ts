import {chalk, fs} from '@roots/bud-support'

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
 * @param callback - Callback function to be called before end of run
 *
 * @public
 */
export function close(callback?: any) {
  const ctx = this as Framework

  process.stdin.removeAllListeners()

  if (process.exitCode !== 0) {
    ctx.logger.instance.error(
      chalk.red(`\nClearing cache due to non-zero exit code.\n`),
    )
    fs.removeSync(ctx.path('@storage/cache'))
  }

  process.exitCode === 0
    ? ctx.context.stdout.write(chalk.green(`\n✔ that's a wrap\n`))
    : ctx.context.stderr.write(chalk.red(`\n✖ Error\n`))

  ctx.hooks.fire('event.app.close')

  callback ? callback() : process.exit()
}
