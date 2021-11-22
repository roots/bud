import {readJson} from 'fs-extra'
import * as React from 'react'

import render from './renderer'
import {CoreTemplate} from './templates/CoreTemplate'
import {ExtensionTemplate} from './templates/ExtensionTemplate'
import {LibraryTemplate} from './templates/LibraryTemplate'
import {RootTemplate} from './templates/RootTemplate'

const {manifest} = require(process.cwd().concat('/package.json'))

const {extensions, core, lib} = manifest

Object.keys(extensions).map(async (pkg: string) => {
  const {name, description} = await readJson(
    process.cwd().concat(`/packages/${pkg}/package.json`),
  )

  render(
    <ExtensionTemplate
      title={name}
      description={description}
      project={manifest}
    />,
    process.cwd().concat(`/packages/${name}/README.md`),
  )
})

Object.keys(core).map(async (pkg: string) => {
  const {name, description} = await readJson(
    process.cwd().concat(`/packages/${pkg}/package.json`),
  )

  render(
    <CoreTemplate
      title={name}
      description={description}
      project={manifest}
    />,
    process.cwd().concat(`/packages/${name}/README.md`),
  )
})

Object.keys(lib).map(async (pkg: string) => {
  const {name, description} = await readJson(
    process.cwd().concat(`/packages/${pkg}/package.json`),
  )

  render(
    <LibraryTemplate
      title={name}
      description={description}
      project={manifest}
    />,
    process.cwd().concat(`/packages/`, name, `/README.md`),
  )
})

render(
  <RootTemplate project={manifest} />,
  process.cwd().concat(`/README.md`),
)
