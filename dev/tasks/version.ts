import {chalk, globby} from '@roots/bud-support'
import execa from 'execa'
import {readJson} from 'fs-extra'

const tag = process.argv.splice(2).pop()

/**
 * Run version
 */
;(async () => {
  const {manifest} = await readJson(
    `${process.cwd()}/package.json`,
  )

  const versionString = `${manifest.version.major}.${
    manifest.version.minor
  }.${manifest.version.patch}${tag ? `-${tag}` : ``}${
    manifest.version.increment
      ? `.${manifest.version.increment}`
      : ``
  }`

  const pkgs = await globby.globby('packages/@roots/*', {
    absolute: false,
    cwd: process.cwd(),
    onlyFiles: false,
  })

  Promise.all(
    pkgs.map(async (pkg: string) => {
      const task = execa(
        'npm',
        [
          'version',
          versionString,
          `--preid`,
          tag,
          `--allow-same-version`,
        ],
        {cwd: pkg},
      )

      task.stdout.on('data', r =>
        process.stdout.write(
          `${chalk.green(
            pkg.split('packages/').pop(),
          )} set to ${chalk.blue(r.toString())}`,
        ),
      )

      task.stderr.on(
        'data',
        r =>
          `${pkg
            .split('packages/')
            .pop()} error: ${r.toString()}`,
      )

      await task

      return Promise.resolve()
    }),
  )
})()
