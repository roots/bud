import {readJson} from 'fs-extra'
import React from 'react'

import project from '../../repo'
import render from './renderer'
import {CoreTemplate} from './templates/CoreTemplate'
import {ExtensionTemplate} from './templates/ExtensionTemplate'
import {LibraryTemplate} from './templates/LibraryTemplate'
import {RootTemplate} from './templates/RootTemplate'

const {
  packages: {extensions, core, lib},
} = project

extensions.map(async pkg => {
  const info = await readJson(
    `${process.cwd()}/packages/${pkg}/package.json`,
  )

  render(
    <ExtensionTemplate
      title={info.name}
      description={info.description}
      logo={project.logo}
    />,
    `${process.cwd()}/packages/${info.name}/README.md`,
  )
})

core.map(async pkg => {
  const info = await readJson(
    `${process.cwd()}/packages/${pkg}/package.json`,
  )

  render(
    <CoreTemplate
      title={info.name}
      description={info.description}
      logo={project.logo}
    />,
    `${process.cwd()}/packages/${info.name}/README.md`,
  )
})

lib.map(async pkg => {
  const info = await readJson(
    `${process.cwd()}/packages/${pkg}/package.json`,
  )

  render(
    <LibraryTemplate
      title={info.name}
      description={info.description}
      logo={project.logo}
    />,
    `${process.cwd()}/packages/${info.name}/README.md`,
  )
})

render(<RootTemplate />, `${process.cwd()}/README.md`)
