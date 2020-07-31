import {fileContainer} from '../container'
import type {FileContainer} from '../container'

const configFiles = [
  {
    name: 'babel',
    filename: 'babel.config.js',
  },
  {
    name: 'eslint',
    filename: '.eslintrc.js',
  },
  {
    name: 'postcss',
    filename: 'postcss.config.js',
  },
  {
    name: 'prettier',
    filename: 'prettier.config.js',
  },
  {
    name: 'stylelint',
    filename: 'stylelint.config.js',
  },
  {
    name: 'typescript',
    filename: 'tsconfig.json',
  },
  {
    name: 'js',
    filename: 'jsconfig.json',
  },
  {
    name: 'vue',
    filename: 'vue.config.js',
  },
]

/**
 * ## bud.state.configs
 */
const configs: (paths: any) => FileContainer = paths => {
  const container = new fileContainer({})

  configFiles.forEach(({name, filename}) => {
    const projectPath = container.fs.path.join(
      paths.get('project'),
      filename,
    )
    if (container.exists(projectPath)) {
      container.set(name, projectPath)
    }
  })

  return container
}

export {configs}
