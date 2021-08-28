import {boundMethod as bind} from 'autobind-decorator'
import execa from 'execa'
import {readFile, readJson} from 'fs-extra'
import {posix} from 'path'
import Webpack from 'webpack'

import {logger} from './logger'

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

  public manifest: {[key: string]: any} = {}

  public modules: {[key: string]: any} = {}

  public webpackConfig: {[key: string]: any} = {}

  public packageJson: {[key: string]: any} = {}

  public prettyPackageJson: string = null

  public logger = logger

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

    this.log('name', this.name)
    this.log('mode', this.mode)
    this.log('dir', this.dir)
    this.log('dist', this.distPath(''))
    this.log('public', this.publicPath(''))
    this.log('storage', this.storagePath(''))
  }

  @bind
  public log(scope, ...args: string[]) {
    this.logger.scope(this.name, scope).log(...args)
  }

  @bind
  public async setup(this: Project): Promise<void> {
    this.log('setup', 'Setting up project')

    await this.setWebpackConfig()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
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
  public async setManifest() {
    this.log(
      'setmanifest',
      `Reading from ${this.distPath('manifest.json')}`,
    )

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

    this.logger.log(`manifest`, manifest)

    Object.assign(this, {manifest})
  }

  @bind
  public async setAssets(): Promise<void> {
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
  public async setWebpackConfig(): Promise<void> {
    this.log(
      'setWebpackConfig',
      `Reading from ${this.storagePath(
        `bud.webpack.config.js`,
      )}`,
    )

    const webpackConfig: Webpack.Configuration = (
      await import(this.storagePath(`bud.webpack.config.js`))
    ).default()

    Object.assign(this, {webpackConfig})
  }

  @bind
  public async setModules(): Promise<void> {
    this.log(
      'setModules',
      `Reading from ${this.storagePath(`bud-modules.json`)}`,
    )

    const modules = await readJson(
      this.storagePath(`bud-modules.json`),
    )

    Object.assign(this, {modules})
  }

  @bind
  public async yarn(...opts: string[]): Promise<void> {
    this.log(`yarn`, `$ yarn ${opts.join(' ')}`)

    const res = execa('yarn', opts, {
      cwd: this.dir,
    })

    res.stdout.on('data', chunk =>
      this.logger.info(chunk.toString()),
    )
    res.stderr.on('data', chunk =>
      this.logger.error(process.stderr),
    )

    await res

    return Promise.resolve()
  }
}

export {Project}
