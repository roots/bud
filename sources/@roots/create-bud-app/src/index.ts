/* eslint-disable no-console */

import {Filesystem} from '@roots/filesystem'
import {execa} from 'execa'
import {join} from 'path'

import * as Config from './prompts/config.js'
import * as PM from './prompts/pm.js'
import * as Project from './prompts/project.js'
import * as Transpiler from './prompts/transpiler.js'
import * as state from './state.js'
import build from './tasks/build.js'
import install from './tasks/install.js'
import writeConfig from './tasks/writeConfig.js'
import writePackageManifest from './tasks/writePackageManifest.js'
import writeReadme from './tasks/writeReadme.js'
import writeSrc from './tasks/writeSrc.js'

await PM.run()
await Project.run()
await Transpiler.run()
await Config.run()

const dirname = state.data.name.includes(`/`)
  ? state.data.name.split(`/`).pop()
  : state.data.name
const directory = join(process.cwd(), dirname)
const fs = new Filesystem(directory)
state.set(`directory`, directory)

const hasPackageJSON = await fs.exists(`package.json`)
if (!hasPackageJSON) await writePackageManifest(fs)

const hasReadme = await fs.exists(`README.md`)
if (!hasReadme) await writeReadme(fs)

const hasBudConfig = await fs.exists(`bud.config.ts`)
if (!hasBudConfig && state.get(`config`)) await writeConfig(fs)

const hasSrc = await fs.exists(`src`)
if (!hasSrc) await writeSrc(fs)

await install(execa)
await build(execa)
