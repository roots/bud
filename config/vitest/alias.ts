import {join, relative} from 'node:path'

import {path} from '@repo/constants'
import globby from '@roots/bud-support/globby'

const packages = await globby(path(`sources/@roots/*`), {
  absolute: true,
  onlyDirectories: true,
})

export default {
  ...packages.reduce((aliases, packageRoot) => {
    const signifier = relative(path(), packageRoot)
    aliases[signifier] = join(packageRoot, `src`)
    return aliases
  }, {}),
  '@roots/filesystem/src/vendor/sdk': path(
    `sources/@roots/filesystem/vendor/sdk`,
  ),
}
