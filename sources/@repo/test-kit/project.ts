/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable no-console */
import {paths, REGISTRY_PROXY} from '@repo/constants'
import * as logger from '@repo/logger'
import {copy, readFile, remove} from 'fs-extra'
import {bind} from 'helpful-decorators'
import * as json5 from 'json5'
import {spawn} from 'node:child_process'
import {posix} from 'node:path'

const {join} = posix

jest.setTimeout(120000)

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

  public storage: string = '.budfiles'

  public assets = {}

  public entrypoints: {
    [key: string]: {
      js: Array<string>
      css: Array<string>
      dependencies?: Array<string>
    }
  } = {}

  public manifest: {[key: string]: any} = {}

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

  /**
   * dir
   * @public
   */
  public dir: string

  /**
   * logger
   * @public
   */
  public logger: typeof logger.logger

  public constructor(public options: Options) {
    this.dir = join(paths.mocks, this.options.with, this.options.name)
    this.logger = logger
      .make({interactive: true})
      .scope(this.options.name, this.options.with)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setup(): Promise<Project> {
    await this.install()
    await this.build()

    await this.setPackageJson()
    await this.setManifest()
    await this.setAssets()
    await this.setModules()
    await this.setEntrypoints()

    this.logger.success('setup complete')

    return this
  }

  @bind
  public async $(bin: string, flags: Array<string>) {
    try {
      await spawn(bin, flags ?? [], {
        cwd: this.projectPath(),
        shell: true,
      })
    } catch (error) {
      logger.error(error)
    }
  }

  @bind
  public async yarnInstall() {
    await this.$(`yarn`, [
      `install`,
      `--update-checksums`,
      `--skip-integrity-check`,
      `--registry`,
      REGISTRY_PROXY,
      `--force`,
    ])
  }

  @bind
  public async npmInstall() {
    await this.$(`npm`, [`install`, `--registry`, REGISTRY_PROXY])
  }
  @bind
  public async install() {
    this.logger.log('removing')

    try {
      await remove(this.projectPath())
    } catch (e) {
      logger.error(e)
    }

    this.logger.log('copying')

    try {
      await copy(`./examples/${this.options.name}`, this.projectPath())
    } catch (e) {
      logger.error(e)
    }

    this.logger.log('installing')

    this.options.with === 'yarn'
      ? await this.yarnInstall()
      : await this.npmInstall()
  }

  @bind
  public async build() {
    this.logger.log('building')

    this.options.with === 'yarn'
      ? await this.$(`yarn`, [`bud`, `build`, `--ci`])
      : await this.$(`node`, [`node_modules/.bin/bud`, `build`, `--ci`])
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public projectPath(file?: string) {
    return join(this.dir, file ?? '')
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async readJson(file: string) {
    const contentString = await readFile(file)
    return json5.parse(contentString.toString())
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setPackageJson() {
    const packageJson = await this.readJson(
      this.projectPath('package.json'),
    )
    Object.assign(this, {packageJson})
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setManifest() {
    this.manifest = await this.readJson(
      this.projectPath(join(this.options.dist, 'manifest.json')),
    )
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setAssets(): Promise<void> {
    this.assets = await Object.entries(this.manifest).reduce(
      async (assets: Promise<any>, [name, path]: [string, string]) => {
        logger.log('attempting to read', join(this.options.dist, path))

        const buffer = await readFile(
          this.projectPath(join(this.options.dist, path)),
          'utf8',
        )

        return {
          ...assets,
          [name]: buffer.toString(),
        }
      },
      Promise.resolve(),
    )
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setEntrypoints() {
    try {
      const entrypoints = await this.readJson(
        this.projectPath(join(this.options.dist, 'entrypoints.json')),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setModules() {
    try {
      const modules = await this.readJson(
        this.projectPath(join(this.storage, 'bud', 'modules.json')),
      )

      Object.assign(this, {modules})
    } catch (e) {}
  }
}
