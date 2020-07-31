import {join} from 'path'
import {existsSync} from 'fs-extra'
import {paths} from './paths'
import type {Configs} from './types'

/**
 * ## bud.state.configs
 */
const configs: Configs = {
  repository: {},
  contents: function (config: string): any | null {
    return require(this.get(config))
  },
  get: function (config: string): any {
    return this.repository[config]
  },
  add: function (name: string, file: string): void {
    this.repository = {
      ...this.repository,
      [name]: file,
    }
  },
  has: function (config: string): boolean {
    return this.repository[config] && this.repository[config] !== null
  },
  exists: function (file: string) {
    return existsSync(file)
  },
}

new Array(
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
).forEach(({name, filename}) => {
  const projectPath = join(paths.project, filename)

  configs.exists(projectPath) && configs.add(name, projectPath)
})

export {configs}
