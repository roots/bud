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
import createComponentsSupportPrompt from '../prompts/support.components.js'
import createCssSupportPrompt from '../prompts/support.css.js'
import createEnvPrompt from '../prompts/support.env.js'
import createJsSupportPrompt from '../prompts/support.js.js'
import createTestSupportPrompt from '../prompts/support.qa.js'
import buildTask from '../tasks/build.js'
import installTask from '../tasks/install.js'
import installProdTask from '../tasks/install.prod.js'
import writeConfig from '../tasks/writeConfig.js'
import writeEslintConfig from '../tasks/writeEslintConfig.js'
import writePackageManifest from '../tasks/writePackageManifest.js'
import writeReadme from '../tasks/writeReadme.js'
import writeSrcTask from '../tasks/writeSrc.js'
import writeStylelintConfig from '../tasks/writeStylelintConfig.js'
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
    description: `Support for various stack components (swc, ts, babel, sass, postcss)`,
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
   * Map of supports to extensions
   */
  public extensions: Record<string, string> = {
    babel: `@roots/bud-babel`,
    emotion: `@roots/bud-emotion`,
    postcss: `@roots/bud-postcss`,
    react: `@roots/bud-react`,
    sass: `@roots/bud-sass`,
    swc: `@roots/bud-swc`,
    tailwindcss: `@roots/bud-tailwindcss`,
    typescript: `@roots/bud-typescript`,
    wordpress: `@roots/bud-preset-wordpress`,
    vue: `@roots/bud-vue`,
    eslint: `@roots/bud-eslint`,
    stylelint: `@roots/bud-stylelint`,
  }

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

  public get hasReactCompatibleTranspiler() {
    return [`swc`, `babel`, `typescript`].some(entry =>
      this.support.includes(entry),
    )
  }

  public get hasEmotionCompatibleTranspiler() {
    return [`swc`, `babel`].some(entry => this.support.includes(entry))
  }

  /**
   * Execute
   */
  public async execute() {
    if (isUndefined(this.username)) this.username = await getGitUser(this)
    if (isUndefined(this.version)) this.version = await getLatestVersion()

    await this.header()

    if (!this.interactive && !this.name) {
      throw new Error(
        `--name is required when running with --no-interactive`,
      )
    }

    if (this.interactive) await this.runPrompts()

    await this.runTasks()

    await this.post()
  }

  /**
   * CLI header
   */
  public async header() {
    this.context.stdout.write(`\ncreate-bud-app \n\n`)
  }

  /**
   * CLI final message
   */
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

  /**
   * Run user prompts
   */
  public async runPrompts() {
    this.packageManager = await createPackageManagerPrompt(this).run()

    const projectPrompt = await createProjectPrompt(this).run()
    const jsPrompt = createJsSupportPrompt(this)
    const cssPrompt = createCssSupportPrompt(this)
    const frameworkPrompt = createComponentsSupportPrompt(this)
    const envPrompt = createEnvPrompt(this)
    const testPrompt = createTestSupportPrompt(this)

    this.name = projectPrompt.name
    this.username = projectPrompt.username
    this.license = projectPrompt.license

    this.support.push(...(await envPrompt.run()))
    this.support.push(...(await jsPrompt.run()))
    this.support.push(...(await cssPrompt.run()))
    this.support.push(...(await frameworkPrompt.run()))
    this.support.push(...(await testPrompt.run()))

    if (this.config) {
      this.config = await createConfigPrompt(this).run()
    }

    this.context.stdout.write(`\n`)
  }

  /**
   * Run tasks
   */
  public async runTasks() {
    if (this.support.includes(`react`)) {
      this.dependencies.push(`react`, `react-dom`)

      if (!this.hasReactCompatibleTranspiler) {
        this.support.push(`swc`)
        this.context.stdout.write(
          `A JS compiler is required for React. We're defaulting to swc (@roots/bud-swc).\n\n`,
        )
      }
    }

    if (this.support.includes(`tailwindcss`)) {
      this.dependencies.push(`tailwindcss`)

      if (!this.support.includes(`postcss`)) {
        this.support.push(`postcss`)
        this.context.stdout.write(
          `PostCSS is required for TailwindCSS. Adding postcss extension support (@roots/bud-postcss).\n\n`,
        )
      }
    }

    if (this.support.includes(`emotion`)) {
      if (!this.hasEmotionCompatibleTranspiler) {
        this.support.push(`swc`)
        this.context.stdout.write(
          `A compatible JS compiler is required for Emotion. We're defaulting to swc (@roots/bud-swc).\n\n`,
        )
      }
    }

    if (this.support.includes(`vue`)) this.dependencies.push(`vue`)

    this.fs = new Filesystem(this.directory)

    const hasPackageJSON = await this.fs.exists(`package.json`)
    if (!hasPackageJSON) {
      await writePackageManifest(this)
    } else {
      this.context.stdout.write(`package.json already exists. Skipping.\n`)
    }

    const hasReadme = await this.fs.exists(`README.md`)
    if (!hasReadme) {
      await writeReadme(this)
    } else {
      this.context.stdout.write(`README.md already exists. Skipping.\n`)
    }

    const hasSrc = await this.fs.exists(`src`)
    if (!hasSrc) {
      await writeSrcTask(this)
    } else {
      this.context.stdout.write(
        `src directory already exists. Skipping.\n`,
      )
    }

    const hasJsConfig = await this.fs.exists(`jsconfig.json`)
    const hasTsConfig = await this.fs.exists(`tsconfig.json`)
    if (!hasTsConfig && !hasJsConfig) {
      await writeTsConfig(this)
    } else {
      this.context.stdout.write(
        `tsconfig.json or jsconfig.json already exists. Skipping.\n`,
      )
    }

    if (this.config) {
      const hasConfig = await this.fs.exists(`bud.config.ts`)
      if (!hasConfig) {
        await writeConfig(this)
      } else {
        this.context.stdout.write(
          `bud.config.ts already exists. Skipping.\n`,
        )
      }
    }

    if (this.support.includes(`tailwindcss`)) {
      const hasTailwindConfig = await this.fs.exists(`tailwind.config.ts`)
      if (!hasTailwindConfig) {
        await writeTailwindConfig(this)
      } else {
        this.context.stdout.write(
          `tailwind.config.ts already exists. Skipping.\n`,
        )
      }
    }

    if (this.support.includes(`eslint`)) {
      this.support.push(`@roots/eslint-config`)
      const hasEslintConfig = (await this.fs.list()).some(file =>
        file.includes(`eslint`),
      )
      if (!hasEslintConfig) {
        await writeEslintConfig(this)
      } else {
        this.context.stdout.write(
          `eslint config already exists. Skipping.\n`,
        )
      }
    }

    if (this.support.includes(`stylelint`)) {
      const hasStylelintConfig = (await this.fs.list()).some(file =>
        file.includes(`stylelint`),
      )
      if (!hasStylelintConfig) {
        await writeStylelintConfig(this)
      } else {
        this.context.stdout.write(
          `stylelint config already exists. Skipping.\n`,
        )
      }
    }

    await installTask(this)
    await installProdTask(this)
    await buildTask(this)
  }
}
