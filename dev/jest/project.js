/* eslint-disable no-console */
const execa = require('execa')
const {readFile} = require('fs-extra')
const json5 = require('json5')

class Project {
  name

  mode = 'production'

  dir = ''

  dist = 'dist'

  storage = '.budfiles'

  assets = {}

  entrypoints = {}

  manifest = {}

  modules = {}

  webpackConfig

  packageJson = {}

  constructor(options) {
    Object.assign(this, {
      ...options,
      dir: options.dir
        ? process.cwd().concat(`/${options.dir}`)
        : process.cwd(),
    })

    this.setup = this.setup.bind(this)
    this.projectPath = this.projectPath.bind(this)
    this.publicPath = this.publicPath.bind(this)
    this.readJson = this.readJson.bind(this)
    this.setPackageJson = this.setPackageJson.bind(this)
    this.setManifest = this.setManifest.bind(this)
    this.setAssets = this.setAssets.bind(this)
    this.setEntrypoints = this.setEntrypoints.bind(this)
    this.setWebpackConfig = this.setWebpackConfig.bind(this)
    this.setModules = this.setModules.bind(this)
    this.yarn = this.yarn.bind(this)
  }

  async setup() {
    await this.setPackageJson()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
    await this.setEntrypoints()
    await this.setWebpackConfig()
  }

  projectPath(file) {
    return `${this.dir}/${file}`
  }

  publicPath(file) {
    return `${this.public}/${file}`
  }

  async readJson(file) {
    const contentString = await readFile(file)
    return json5.parse(contentString)
  }

  async setPackageJson() {
    let packageJson = await this.readJson(
      this.projectPath('package.json'),
    )

    Object.assign(this, {packageJson})
  }

  async setManifest() {
    let manifest = await this.readJson(
      this.projectPath(`${this.dist}/manifest.json`),
    )

    /**
     * If publicPath is configured, we need to remove from
     * entries or they won't resolve
     */
    manifest = Object.entries(manifest).reduce(
      (a, [k, v]) => ({
        ...a,
        [k]: v.replace(this.public, ''),
      }),
      {},
    )

    Object.assign(this, {manifest})
  }

  async setAssets() {
    const assets = await Object.entries(this.manifest).reduce(
      async (promised, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(
          this.projectPath(`${this.dist}/${path}`),
          'utf8',
        )

        return {
          ...assets,
          [name]: buffer.toString(),
        }
      },
      Promise.resolve(),
    )

    Object.assign(this, {assets})
  }

  async setEntrypoints() {
    try {
      const entrypoints = await this.readJson(
        this.projectPath(`${this.dist}/entrypoints.json`),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  async setWebpackConfig() {
    try {
      const webpackConfig = await readFile(
        this.projectPath(
          `${this.storage}/bud/webpack.config.js`,
        ),
        'utf8',
      )

      this.webpackConfig = webpackConfig
    } catch (e) {}
  }

  async setModules() {
    try {
      const modules = await this.readJson(
        this.projectPath(`${this.storage}/bud/modules.json`),
      )

      Object.assign(this, {modules})
    } catch (e) {}
  }

  async yarn(...opts) {
    const res = execa('yarn', opts, {
      cwd: this.dir,
    })

    await res

    return Promise.resolve()
  }
}

module.exports = Project
