/* eslint-disable n/no-process-env */

import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {Filesystem} from '@roots/filesystem'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import isUndefined from 'lodash/isUndefined.js'

import createConfigPrompt from '../prompts/config.js'
import createPackageManagerPrompt from '../prompts/packageManager.js'
import createProjectPrompt from '../prompts/project.js'
import createCssSupportPrompt from '../prompts/support.css.js'
import createFrameworkSupportPrompt from '../prompts/support.framework.js'
import createJsSupportPrompt from '../prompts/support.js.js'
import buildTask from '../tasks/build.js'
import installTask from '../tasks/install.js'
import installProdTask from '../tasks/install.prod.js'
import writeConfig from '../tasks/writeConfig.js'
import writePackageManifest from '../tasks/writePackageManifest.js'
import writeReadme from '../tasks/writeReadme.js'
import writeSrcTask from '../tasks/writeSrc.js'
import writeTailwindConfig from '../tasks/writeTailwindConfig.js'
import writeTsConfig from '../tasks/writeTsConfig.js'
import getGitUser from '../utilities/getGitUser.js'
import getLatestVersion from '../utilities/getLatestVersion.js'

/**
 * create-bud-app command
 */
export default class CreateCommand extends Command {
  /**
   * --cwd
   */
  public cwd = Option.String(`--cwd`, process.cwd(), {
    description: `Current working directory`,
  })

  /**
   * --config
   */
  public config = Option.Boolean(`--config,-c`, true, {
    description: `Include bud.config.ts in generated boilerplate`,
  })

  /**
   * --dependencies
   */
  public dependencies = Option.Array(`--dependencies,-d`, [], {
    description: `Runtime dependencies (e.g. react, vue)`,
  })

  /**
   * --interactive
   */
  public interactive = Option.Boolean(`--interactive,-i`, true, {
    description: `Interactive mode`,
  })

  /**
   * --license
   */
  public license = Option.String(`--license,-l`, `MIT`, {
    description: `Project license`,
  })

  /**
   * --name
   */
  public name = Option.String(`--name`, {
    description: `Project name`,
  })

  /**
   * --package-manager
   */
  public packageManager = Option.String(`--package-manager,-p`, `npm`, {
    description: `Package manager`,
  })

  /**
   * --support
   */
  public support = Option.Array(`--support,-s`, [], {
    description: `Support for various stack components (swc, ts, babel, esbuild, sass, postcss)`,
  })

  /**
   * --username
   */
  public username = Option.String(`--username,-u`, undefined, {
    description: `Github username`,
  })

  /**
   * --version
   */
  public version = Option.String(`--version,-v`, undefined, {
    description: `Target bud.js version`,
  })

  /**
   * Filesystem instance
   */
  public fs: Filesystem

  /**
   * Run arbitrary shell commands
   */
  public async sh(command: string, args: string[]) {
    return await execa(command, args, {
      cwd: this.directory,
      env: {
        ...process.env,
        NODE_ENV: `development`,
      },
    })
  }

  /**
   * Directory name
   */
  public get dirname() {
    return this.name.includes(`/`) ? this.name.split(`/`).pop() : this.name
  }

  /**
   * Directory path
   */
  public get directory() {
    return join(this.cwd, this.dirname)
  }

  /**
   * Path to root of `@roots/create-bud-app`
   */
  public get createRoot() {
    return resolve(
      this.cwd,
      join(dirname(fileURLToPath(import.meta.url)), `..`, `..`),
    )
  }

  /**
   * Execute
   */
  public async execute() {
    if (isUndefined(this.username)) this.username = await getGitUser(this)
    if (isUndefined(this.version)) this.version = await getLatestVersion()

    await this.header()

    if (this.interactive) {
      this.packageManager = await createPackageManagerPrompt(this).run()

      const project = await createProjectPrompt(this).run()
      this.name = project.name
      this.username = project.username
      this.license = project.license

      this.support.push(...(await createJsSupportPrompt(this).run()))
      this.support.push(...(await createCssSupportPrompt(this).run()))
      this.support.push(
        ...(await createFrameworkSupportPrompt(this).run()),
      )

      if (this.config) {
        this.config = await createConfigPrompt(this).run()
      }
    }

    if (this.support.includes(`@roots/bud-react`)) {
      this.dependencies.push(`react`, `react-dom`)
    }
    if (this.support.includes(`@roots/bud-vue`)) {
      this.dependencies.push(`vue`)
    }
    if (this.support.includes(`@roots/bud-tailwindcss`)) {
      this.dependencies.push(`tailwindcss`)
    }

    this.fs = new Filesystem(this.directory)

    this.context.stdout.write(`\n`)

    const hasPackageJSON = await this.fs.exists(`package.json`)
    if (!hasPackageJSON) await writePackageManifest(this)

    const hasReadme = await this.fs.exists(`README.md`)
    if (!hasReadme) await writeReadme(this)

    const hasConfig = await this.fs.exists(`bud.config.ts`)
    if (!hasConfig && this.config !== false) await writeConfig(this)

    await installTask(this)
    await installProdTask(this)
    await writeSrcTask(this)
    await writeTsConfig(this)

    if (this.support.includes(`@roots/bud-tailwindcss`)) {
      await writeTailwindConfig(this)
    }

    await buildTask(this)
    await this.post()
  }

  public async header() {
    this.context.stdout.write(`\ncreate-bud-app \n\n`)
  }

  public async post() {
    this.context.stdout.write(
      `\nProject ready for you to start building!\n\n`,
    )
    this.context.stdout.write(
      `Navigate to ${this.directory} and run \`${
        this.packageManager === `yarn` ? `yarn` : `npx`
      } bud dev\` to get started.\n\n`,
    )
    this.context.stdout.write(
      `When you are ready to deploy, run \`${
        this.packageManager === `yarn` ? `yarn` : `npx`
      } bud build\` to compile your project for production.\n\n`,
    )
    this.context.stdout.write(`Happy hacking!\n\n`)
  }
}
