import type {Repository} from '../container'
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

const configs: (paths: any) => Repository = paths => {
  const repository = {}

  configFiles.forEach(({name, filename}) => {
    const projectPath = join(paths.get('project'), filename)

    if (existsSync(projectPath)) {
      repository[name] = projectPath
    }
  })

  return repository
}

export {configs}
