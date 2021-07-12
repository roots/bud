import {readJson} from 'fs-extra'
import React from 'react'

import render from './renderer'
import {RootTemplate} from './templates/RootTemplate'
import {CoreTemplate} from './templates/CoreTemplate'
import {ExtensionTemplate} from './templates/ExtensionTemplate'
import {LibraryTemplate} from './templates/LibraryTemplate'
import project from '../../repo'

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
