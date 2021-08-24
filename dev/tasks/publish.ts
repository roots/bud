import {globby} from '@roots/bud-support'
import * as execa from 'execa'

const tag = process.argv.splice(2).pop()

/**
 * Run publish
 */
;(async () => {
  const pkgs = await globby.globby('packages/@roots/*', {
    absolute: false,
    cwd: process.cwd(),
    onlyFiles: false,
  })

  pkgs.map((pkg: string) => {
    const command = [
      'npm',
      'publish',
      '--tolerate-republish',
      '--access',
      'public',
    ]

    if (tag) {
      command.push('--tag', tag)
    }

    execa.sync('yarn', command, {cwd: pkg})
  })
})()
