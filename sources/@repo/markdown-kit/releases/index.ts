import fs from 'fs-extra'

import {release, releases} from './data.js'
import {body, path} from './release.js'

const write = async (release: release) =>
  await fs.writeFile(path(release), body(release))

await Promise.all(releases.map(write))
