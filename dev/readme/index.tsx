import {readJson} from 'fs-extra'
import React from 'react'

import render from './renderer'
import {RootReadme, MasterReadme} from './MasterReadme'
import project from '../../repo'

const generateReadmes = () =>
  project.packages.map(async pkg => {
    const info = await readJson(
      `${process.cwd()}/packages/${pkg}/package.json`,
    )

    render(
      <MasterReadme
        title={info.name}
        description={info.description}
        logo={project.logo}
      />,
      `${process.cwd()}/packages/${info.name}/README.md`,
    )
  })

generateReadmes()

render(<RootReadme />, `${process.cwd()}/README.md`)
