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
  contents: function (this: Configs, config: string): any|null {
    return require(this.get(config))
  },
  get: function (this: Configs, config: string): any {
    return this.repository[config]
  },
  add: function (name: string, file: string): void {
    this.repository = {
      ...this.repository,
      ...{name, file}
    }
  },
  has: function (this: Configs, config: string): boolean {
    return this.repository.hasOwnProperty(config) &&
      this.repository[config] !== null
  },
  exists: function (this: Configs, file: string) {
    return existsSync(file)
  },
}

new Array(
  ['babel', 'babel.config.js'],
  ['eslint', '.eslintrc.js'],
  ['postCss', 'postcss.config.js'],
  ['prettier', 'prettier.config.js'],
  ['stylelint', '.stylelintrc.js'],
  ['typescript', 'tsconfig.json'],
  ['js', 'jsconfig.json'],
).forEach(([name, filename]) => {
  const projectPath = join(paths.project, filename)
  configs.exists(projectPath) && configs.add(name, projectPath)
})

export {configs}
