import fs from '@roots/bud-support/fs-jetpack'

import {release, releases} from './data.js'
import {body, path} from './release.js'

const write = async (release: release) =>
  await fs.writeAsync(path(release), body(release))

await Promise.all(releases.map(write))
