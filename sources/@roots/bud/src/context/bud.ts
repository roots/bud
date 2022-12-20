import {dirname, join, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Context} from '@roots/bud-framework/options'
import {json} from '@roots/bud-support/filesystem'
import fs from '@roots/bud-support/fs-jetpack'

let bud: Context[`bud`] = {}

const resolvedPath = dirname(fileURLToPath(import.meta.url))
bud.manifestPath = resolve(join(resolvedPath, `..`, `..`, `package.json`))
bud.basedir = dirname(bud.manifestPath)

const manifest = await json.read(fs.cwd(bud.basedir).path(`package.json`))
bud.label = manifest.name.split(sep).pop()
bud.version = manifest.version

export default bud
