import {join} from 'path'
import {existsSync} from 'fs-extra'
import {paths} from './paths'
import type {Configs} from './types'

const config = file => join(paths.project, file)

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
  ['babel', 'babel.config.js'],
  ['eslint', '.eslintrc.js'],
  ['postCss', 'postcss.config.js'],
  ['prettier', 'prettier.config.js'],
  ['stylelint', 'stylelint.config.js'],
  ['typescript', 'tsconfig.json'],
  ['js', 'jsconfig.json'],
  ['vue', 'vue.config.js'],
).forEach(([name, filename]) => {
  const projectPath = join(paths.project, filename)
  configs.exists(projectPath) && configs.add(name, projectPath)
})

export {configs}
