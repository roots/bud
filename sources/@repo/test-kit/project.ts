/* eslint-disable n/no-process-env */
/* eslint-disable no-console */
import {posix} from 'node:path'

import {paths} from '@repo/constants'
import {bind} from '@roots/bud-support/decorators'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'

const {join} = posix

interface Options {
  label: string
  dist?: string
  buildCommand?: [string, Array<string>?]
}

interface Entrypoints {
  [key: string]: {
    js: Array<string>
    css: Array<string>
    dependencies?: Array<string>
  }
}

/**
 * This class is used in integration tests.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    label: '@examples/basic',
 *  })

 *  await project.setup()
 *
 *  ...
 *  expect(project.packageJson).toMatchSnapshot()
 *  expect(project.assets['main.js'].length).toBeGreaterThan(10)
 *  ...
 * ```
 */
export class Project {
  /**
   * Manifest assets
   */
  public assets: Record<string, string> = {}

  /**
   * entrypoints.json
   */
  public entrypoints: Entrypoints = {}

  /**
   * manifest.json
   */
  public manifest: Record<string, any> = {}

  /**
   * Directory
   */
  public directory: string

  /**
   * Filesystem
   */
  public fs: Filesystem

  /**
   * Class constructor
   */
  public constructor(public options: Options) {
    this.directory = join(
      paths.fixtures,
      this.options.label.replace(`@examples/`, ``),
    )
    this.options.dist = this.options.dist ?? `dist`
    this.fs = new Filesystem()
  }

  /**
   * setup project
   */
  @bind
  public async setup(): Promise<Project> {
    await this.install()
    await this.build()
    await this.setManifest()

    /**
     * Setup assets
     */
    try {
      await Promise.all(
        Object.entries(this.manifest).map(
          async ([name, path]: [string, string]) => {
            const buffer = await this.fs.read(
              this.projectPath(this.options.dist, path),
            )

            this.assets[name] = buffer.toString()
          },
          Promise.resolve({}),
        ),
      )
    } catch (e) {}

    /**
     * Setup entrypoints
     */
    try {
      const entrypoints = await this.fs.read(
        this.projectPath(join(this.options.dist, `entrypoints.json`)),
      )

      Object.assign(this, {entrypoints})
    } catch (e) {}

    return this
  }

  /**
   * Install and setup integration test fixture
   */
  @bind
  public async install(): Promise<this> {
    /**
     * Clean out existing files
     */
    try {
      await this.fs.remove(this.directory)
    } catch (e) {
      throw e
    }

    /**
     * Copy fixture files
     */
    try {
      await this.fs.copy(
        join(
          paths.root,
          `examples`,
          this.options.label.replace(`@examples/`, ``),
        ),
        this.directory,
        {overwrite: true},
      )
    } catch (e) {
      throw e
    }

    /**
     * Write .npmrc
     */
    try {
      await this.fs.write(
        this.projectPath(`.npmrc`),
        `\
@roots:registry=http://localhost:4873
workspaces=false
`,
      )
    } catch (e) {
      throw e
    }

    /**
     * Install dependencies
     */
    try {
      const child = await execa(
        `npm`,
        [
          `install`,
          `--cache`,
          join(paths.storage, `cache`, `npm`),
          `--registry`,
          `http://localhost:4873`,
        ],
        {
          cwd: this.directory,
          env: {...process.env, NODE_ENV: `development`},
        },
      )
      if (child?.stdout) {
        await this.fs.write(
          this.projectPath(`install.stdout.log`),
          child.stdout,
        )
      }

      if (child.stderr) {
        await this.fs.write(
          this.projectPath(`install.stderr.log`),
          child.stderr,
        )
      }
    } catch (e) {
      throw e
    }

    return this
  }

  /**
   * Build integration test fixture
   */
  @bind
  public async build() {
    /**
     * Construct build command and args (default `bud build`)
     */
    const build = this.options.buildCommand ?? [
      `node`,
      [
        this.projectPath(`node_modules`, `.bin`, `bud`),
        `build`,
        `--force`,
        `--storage`,
        `.storage`,
      ],
    ]

    /**
     * Execute build command
     */
    const child = await execa(...build, {
      cwd: this.directory,
    })
    child.stdout &&
      (await this.fs.write(
        this.projectPath(`build.stdout.log`),
        child.stdout,
      ))
    child.stderr &&
      (await this.fs.write(
        this.projectPath(`build.stderr.log`),
        child.stderr,
      ))

    return this
  }

  /**
   * Get the directory of the integration test fixture
   */
  @bind
  public projectPath(...file: Array<string>) {
    return join(this.directory, ...file)
  }

  /**
   * Assign the `manifest.json` data to {@link this.manifest}
   */
  @bind
  public async setManifest() {
    this.manifest = await this.fs.read(
      this.projectPath(this.options.dist, `manifest.json`),
    )
  }

  /**
   * Mapped data for {@link this.manifest} entries
   */
  @bind
  public async setAssets(): Promise<void> {
    await Promise.all(
      Object.entries(this.manifest).map(
        async ([name, path]: [string, string]) => {
          const buffer = await this.fs.read(
            this.projectPath(this.options.dist, path),
          )

          this.assets[name] = buffer.toString()
        },
        Promise.resolve({}),
      ),
    )
  }
}
