/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-console */
import {bind, execa} from '@roots/bud-support'
import {readFile} from 'fs-extra'
import * as json5 from 'json5'
import {join} from 'path'

interface Options {
  name: string
  with: 'yarn' | 'npm'
  dist?: string
}

/**
 * This class is used to represent an example project being used
 * as the subject of an integration test.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    name: 'basic',
 *    with: 'yarn',
 *  })

 *  await project.setup()
 *
 *  ...
 *  expect(project.packageJson).toMatchSnapshot()
 *  expect(project.assets['main.js'].length).toBeGreaterThan(10)
 *  ...
 * ```
 *
 * @internal
 */
export class Project {
  public name: string

  public mode: 'dev' | 'production' = 'production'

  public dist: string = 'dist'

  public storage: string = '.budfiles'

  public assets = {}

  public entrypoints: {
    [key: string]: {
      js: Array<string>
      css: Array<string>
      dependencies?: Array<string>
    }
  } = {}

  public manifest = {}

  public modules: {
    chunks: {
      byName: any
      bySource: any
    }
  } = {
    chunks: {
      byName: null,
      bySource: null,
    },
  }

  public packageJson: Record<string, any> = {}

  public constructor(public options: Options) {}

  public async setup() {
    if (this.options.dist) {
      this.dist = this.options.dist
    }

    await this.setPackageJson()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
    await this.setEntrypoints()

    return this
  }

  public get dir() {
    return join(`/srv/mocks`, this.options.with, this.options.name)
  }

  @bind
  public projectPath(file) {
    return `${this.dir}/${file}`
  }

  @bind
  public async readJson(file: string) {
    const contentString = await readFile(file)
    return json5.parse(contentString.toString())
  }

  @bind
  public async setPackageJson() {
    let packageJson = await this.readJson(this.projectPath('package.json'))
    Object.assign(this, {packageJson})
  }

  @bind
  public async setManifest() {
    let manifest = await this.readJson(
      this.projectPath(`${this.dist}/manifest.json`),
    )

    Object.assign(this, {manifest})
  }

  @bind
  public async setAssets() {
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

  @bind
  public async setEntrypoints() {
    try {
      const entrypoints = await this.readJson(
        this.projectPath(`${this.dist}/entrypoints.json`),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  @bind
  public async setModules() {
    try {
      const modules = await this.readJson(
        this.projectPath(`${this.storage}/bud/modules.json`),
      )

      Object.assign(this, {modules})
    } catch (e) {}
  }

  @bind
  public async yarn(...opts: any) {
    const res = execa.execa('yarn', opts, {
      cwd: this.dir,
    })

    await res

    return Promise.resolve()
  }
}
