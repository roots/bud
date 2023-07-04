import {Filesystem} from '@roots/bud-support/filesystem'

import {type release, releases} from './data.js'
import {body, path} from './release.js'

const fs = new Filesystem()

const write = async (release: release) =>
  await fs.write(path(release), body(release))

await Promise.all(releases.map(write))
