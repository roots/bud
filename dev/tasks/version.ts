import {globby} from '@roots/bud-support'
import * as execa from 'execa'
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
    manifest.version.increment !== '0'
      ? `.${manifest.version.increment}`
      : ``
  }`

  const pkgs = await globby.globby('packages/@roots/*', {
    absolute: false,
    cwd: process.cwd(),
    onlyFiles: false,
  })

  pkgs.map((pkg: string) => {
    execa.sync(
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
  })
})()
