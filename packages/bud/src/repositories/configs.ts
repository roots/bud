import type {RepositoryDefinition, Repository} from '../container'
import type {Bud} from '../'
import {join} from 'path'
import {existsSync} from 'fs-extra'

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
  repository: 'configs',
  contents: (bud: Bud) => ({
    ...configFiles.map(config => {
      const projectPath = join(
        bud.paths.get('project'),
        config.filename,
      )

      if (existsSync(projectPath)) {
        return {[config.name]: projectPath}
      }

      return {}
    }),
  }),
}

export {configs}
