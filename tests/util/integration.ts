import {boundMethod as bind} from 'autobind-decorator'
import execa from 'execa'
import {readFile, readJson} from 'fs-extra'
import {posix} from 'path'
import Webpack from 'webpack'

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

class Project {
  public name: string

  public mode: 'development' | 'production' = 'production'

  public dir: string = ''

  public dist: string = 'dist'

  public storage: string = '.budfiles'

  public public: string = ''

  public assets: Assets = {}

  public entrypoints: Assets = {}

  public manifest: {[key: string]: any} = {}

  public modules: {[key: string]: any} = {}

  public webpackConfig: {[key: string]: any} = {}

  public packageJson: {[key: string]: any} = {}

  public prettyPackageJson: string = null

  public constructor(options: {
    name: string
    mode?: 'development' | 'production'
    dir?: string
    dist?: string
    public?: string
    storage?: string
  }) {
    const parsed = {
      ...options,
      dir: options.dir
        ? process.cwd().concat(`/${options.dir}`)
        : process.cwd(),
    }
    Object.assign(this, parsed)
  }

  @bind
  public async setup(this: Project): Promise<void> {
    await this.setPackageJson()
    await this.setWebpackConfig()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
    await this.setEntrypoints()
  }

  @bind
  public projectPath(file: string): string {
    return posix.normalize(`${this.dir}/${file}`)
  }

  @bind
  public distPath(file: string) {
    return posix.normalize(
      this.projectPath(`${this.dist}/${file}`),
    )
  }

  @bind
  public storagePath(file: string) {
    return posix.normalize(
      this.projectPath(`${this.storage}/${file}`),
    )
  }

  @bind
  public publicPath(file: string) {
    return posix.normalize(`${this.public}/${file}`)
  }

  @bind
  public async setPackageJson() {
    let packageJson: {[key: string]: string} = await readJson(
      this.projectPath('package.json'),
    )

    Object.assign(this, {packageJson})
  }

  @bind
  public async setManifest() {
    let manifest: {[key: string]: string} = await readJson(
      this.distPath('manifest.json'),
    )

    /**
     * If publicPath is configured, we need to remove from
     * entries or they won't resolve
     */
    if (this.public !== '') {
      manifest = Object.entries(manifest).reduce(
        (a, [k, v]): Assets => ({
          ...a,
          [k]: v.replace(this.public, ''),
        }),
        {},
      )
    }

    Object.assign(this, {manifest})
  }

  @bind
  public async setAssets(): Promise<void> {
    if (!this.manifest) return

    const assets = await Object.entries(this.manifest).reduce(
      async (promised: Promise<any>, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(
          this.distPath(path),
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

  @bind
  public async setEntrypoints(): Promise<void> {
    try {
      const entrypoints = await readJson(
        this.distPath('entrypoints.json'),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  @bind
  public async setWebpackConfig(): Promise<void> {
    try {
      const webpackConfig: Webpack.Configuration = (
        await import(this.storagePath(`bud.webpack.config.js`))
      ).default()

      Object.assign(this, {webpackConfig})
    } catch (er) {}
  }

  @bind
  public async setModules(): Promise<void> {
    try {
      const modules = await readJson(
        this.storagePath(`bud-modules.json`),
      )

      Object.assign(this, {modules})
    } catch (e) {}
  }

  @bind
  public async yarn(...opts: string[]): Promise<void> {
    const res = execa('yarn', opts, {
      cwd: this.dir,
    })

    await res

    return Promise.resolve()
  }
}

export {Project}
