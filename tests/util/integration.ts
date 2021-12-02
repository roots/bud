/* eslint-disable no-console */
import execa from 'execa'
import {readFile, readJson} from 'fs-extra'

export interface Assets {
  [key: string]: any
}

export interface Entrypoints {
  [key: string]: {
    js?: string[]
    css?: string[]
    dependencies?: string[]
  }
}

export interface SomeJson {
  [key: string]: any
}

class Project {
  public name: string

  public mode: 'development' | 'production' = 'production'

  public dir: string = ''

  public dist: string = 'dist'

  public storage: string = '.budfiles'

  public public: string = ''

  public assets: Assets = {}

  public entrypoints: Assets = {}

  public manifest: SomeJson = {}

  public modules: SomeJson = {}

  public webpackConfig: string

  public packageJson: SomeJson = {}

  public constructor(options: {
    name: string
    mode?: 'development' | 'production'
    dir?: string
    dist?: string
    public?: string
    storage?: string
  }) {
    Object.assign(this, {
      ...options,
      dir: options.dir
        ? process.cwd().concat(`/${options.dir}`)
        : process.cwd(),
    })

    this.setup = this.setup.bind(this)
    this.projectPath = this.projectPath.bind(this)
    this.publicPath = this.publicPath.bind(this)
    this.setPackageJson = this.setPackageJson.bind(this)
    this.setManifest = this.setManifest.bind(this)
    this.setAssets = this.setAssets.bind(this)
    this.setEntrypoints = this.setEntrypoints.bind(this)
    this.setWebpackConfig = this.setWebpackConfig.bind(this)
    this.setModules = this.setModules.bind(this)
    this.yarn = this.yarn.bind(this)
  }

  public async setup(this: Project): Promise<void> {
    await this.setPackageJson()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
    await this.setEntrypoints()
    await this.setWebpackConfig()
  }

  public projectPath(file: string): string {
    return `${this.dir}/${file}`
  }

  public publicPath(file: string) {
    return `${this.public}/${file}`
  }

  public async setPackageJson() {
    let packageJson: SomeJson = await readJson(
      this.projectPath('package.json'),
    )

    Object.assign(this, {packageJson})
  }

  public async setManifest() {
    let manifest: SomeJson = await readJson(
      this.projectPath(`${this.dist}/manifest.json`),
    )

    /**
     * If publicPath is configured, we need to remove from
     * entries or they won't resolve
     */
    manifest = Object.entries(manifest).reduce(
      (a, [k, v]): Assets => ({
        ...a,
        [k]: v.replace(this.public, ''),
      }),
      {},
    )

    Object.assign(this, {manifest})
  }

  public async setAssets(): Promise<void> {
    const assets = await Object.entries(this.manifest).reduce(
      async (promised: Promise<any>, [name, path]) => {
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

  public async setEntrypoints(): Promise<void> {
    try {
      const entrypoints = await readJson(
        this.projectPath(`${this.dist}/entrypoints.json`),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  public async setWebpackConfig(): Promise<void> {
    try {
      const webpackConfig: string = await readFile(
        this.projectPath(
          `${this.storage}/bud/webpack.config.js`,
        ),
        'utf8',
      )

      this.webpackConfig = webpackConfig
    } catch (e) {}
  }

  public async setModules(): Promise<void> {
    try {
      const modules = await readJson(
        this.projectPath(`${this.storage}/bud/modules.json`),
      )

      Object.assign(this, {modules})
    } catch (e) {}
  }

  public async yarn(...opts: string[]): Promise<void> {
    const res = execa('yarn', opts, {
      cwd: this.dir,
    })

    await res

    return Promise.resolve()
  }
}

export {Project}
