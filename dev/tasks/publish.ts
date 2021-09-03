/* eslint-disable no-console */
import {chalk, globby} from '@roots/bud-support'
import execa from 'execa'

/**
 * Process argv
 */
const argv = process.argv.splice(2)
const tag = argv[0] ?? null
const dryRun = argv.includes('--dry-run')

/**
 * Publish errything to npm
 *
 * @remarks
 * Doesn't wrap `yarn npm publish` command, because it lacks
 * flexibility in tagging (doesn't support `--tag` option with arbitrary tag names).
 * Instead, this wraps the `npm publish` command directly.
 *
 * @remarks
 * Takes a single argument, which is the tag to publish.
 *
 * @remarks
 * Use `--dry-run` to see what would happen without actually publishing.
 *
 * @example
 * Publish ish
 *
 * ```bash
 * $ yarn ts-node ./dev/tasks/publish
 * ```
 *
 * @example
 * Do a dry run
 *
 * ```bash
 * $ yarn ts-node ./dev/tasks/publish --dry-run
 * ```
 *
 * @example
 * Publish tagged version
 *
 * ```bash
 * $ yarn ts-node ./dev/tasks/publish next
 * ```
 *
 * @param {string} tag - Tag to publish with
 * @param {boolean} dryRun - Dry run flag
 * @returns {void}
 * @throws {Error}
 */
;(async () => {
  /**
   * Gather pkg paths
   */
  const pkgs = await globby.globby('packages/@roots/*', {
    absolute: true,
    cwd: process.cwd(),
    onlyDirectories: true,
  })

  Promise.all(
    /**
     * Async publish mapping
     *
     * @param   {(): Promise<void>} async publish job
     * @param   {string}            pkg   package path
     *
     * @return  {Promise<void>} promise resolved when publish is complete
     */
    pkgs.map(async (pkg: string) => {
      // Pkg name
      const name = chalk.bgGreen.black(
        `[${pkg.split('packages/').pop()}]`,
      )

      console.log(`${name} publishing...`)

      // Don't publish packages with no package.json
      if (
        !(
          await globby.globby(`${pkg}/package.json`, {
            absolute: true,
          })
        ).length
      ) {
        throw new Error(`${pkg} has no package.json`)
      }

      // Don't publish packages that haven't been built
      if (
        !(
          await globby.globby(`${pkg}/lib/cjs/*`, {
            absolute: true,
          })
        ).length
      ) {
        throw new Error(`${pkg} has no cjs files`)
      }

      // Don't publish packages that haven't been built
      if (
        !(
          await globby.globby(`${pkg}/lib/esm/*`, {
            absolute: true,
          })
        ).length
      ) {
        throw new Error(`${pkg} has no esm files`)
      }

      // Base publish command
      const command = ['publish', '--access', 'public']

      // Add tag if provided
      tag && command.push('--tag', tag)

      // Add --dry-run if provided
      dryRun && command.push('--dry-run')

      // Run command with execa
      const task = execa('npm', command, {cwd: pkg})

      // Log output
      task.stdout.on('data', r =>
        process.stdout.write(
          `${name} ${chalk.blue(r.toString())}`,
        ),
      )

      // Log errors
      task.stderr.on(
        'data',
        r => `${name} ${chalk.red(r.toString())}`,
      )

      // Wait for publish task to complete
      await task

      // Resolve promise
      return Promise.resolve()
    }),
  )
})()
