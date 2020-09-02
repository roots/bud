import {join} from 'path'
import {existsSync} from 'fs-extra'

import type {RepositoryDefinition} from '@roots/bud-typings'

const configFiles = [
  {
    name: 'babel',
    filename: 'babel.config.js',
  },
  {
    name: 'postcss',
    filename: 'postcss.config.js',
  },
  {
    name: 'js',
    filename: 'jsconfig.json',
  },
]

const configs: RepositoryDefinition = {
  name: 'configs',
  register: {
    ...configFiles.map(config => {
      const projectPath = join(process.cwd(), config.filename)

      if (existsSync(projectPath)) {
        return {[config.name]: projectPath}
      }

      return []
    }),
  },
}

export {configs}
