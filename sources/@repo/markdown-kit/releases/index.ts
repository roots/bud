import {path} from '@repo/constants'
import {Filesystem} from '@roots/bud-support/filesystem'

import {type release, releases} from './data.js'
import {body} from './release.js'

const fs = new Filesystem()

const write = async (release: release) =>
  await fs.write(
    path(
      `sources`,
      `@repo`,
      `docs`,
      `generated`,
      `releases`,
      `${release.semver}.mdx`,
    ),
    body(release),
  )

await Promise.all(releases.map(write))
