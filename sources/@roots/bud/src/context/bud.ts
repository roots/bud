import {dirname, join, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import {json} from '@roots/bud-support/filesystem'
import fs from '@roots/bud-support/fs-jetpack'

let bud: {
  label: string
  basedir: string
  version: string
  manifestPath: string
} = {
  label: null,
  basedir: null,
  version: null,
  manifestPath: null,
}

const resolvedPath = dirname(fileURLToPath(import.meta.url))
bud.manifestPath = resolve(join(resolvedPath, `..`, `..`, `package.json`))
bud.basedir = dirname(bud.manifestPath)

const manifest = await json.read(fs.cwd(bud.basedir).path(`package.json`))
bud.label = manifest.name.split(sep).pop()
bud.version = manifest.version

export default bud
