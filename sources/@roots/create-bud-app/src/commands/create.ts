/* eslint-disable n/no-process-env */

import {dirname, join, normalize, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {Filesystem} from '@roots/filesystem'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import isUndefined from 'lodash/isUndefined.js'
import ora from 'ora'
import {isArray, isLiteral, isOneOf} from 'typanion'

import createConfigPrompt from '../prompts/config.js'
import createPackageManagerPrompt from '../prompts/packageManager.js'
import createProjectPrompt from '../prompts/project.js'
import createComponentsSupportPrompt from '../prompts/support.components.js'
import createCssSupportPrompt from '../prompts/support.css.js'
import createEnvPrompt from '../prompts/support.env.js'
import createJsSupportPrompt from '../prompts/support.js.js'
import createTestSupportPrompt from '../prompts/support.qa.js'
import buildTask from '../tasks/build.js'
import installDevTask from '../tasks/install.dev.js'
import installProdTask from '../tasks/install.prod.js'
import writeConfig from '../tasks/write.bud.config.js'
import writeEslintConfig from '../tasks/write.eslint.config.js'
import writeGitignoreConfigTask from '../tasks/write.gitignore.js'
import writePackageManifest from '../tasks/write.package.js'
import writePrettierConfig from '../tasks/write.prettier.config.js'
import writeReadme from '../tasks/write.readme.js'
import writeSrcTask from '../tasks/write.src.js'
import writeStylelintConfig from '../tasks/write.stylelint.config.js'
import writeTailwindConfig from '../tasks/write.tailwind.config.js'
import writeTsConfig from '../tasks/write.tsconfig.js'
import getGitUser from '../utilities/getGitUser.js'
import getLatestVersion from '../utilities/getLatestVersion.js'

type supports = Array<
  | `swc`
  | `typescript`
  | `babel`
  | `emotion`
  | `sass`
  | `postcss`
  | `tailwindcss`
  | `wordpress`
  | `react`
  | `vue`
  | `eslint`
  | `stylelint`
  | `prettier`
>

/**
 * create-bud-app command
 */
export default class CreateCommand extends Command {
  /**
   * The command path
   */
  public static override paths = [Command.Default]

  /**
   * The command usage
   */
  public static override usage = Command.Usage({
    description: `Scaffolding tool for bud.js projects`,
    details: `
      This command scaffolds a new bud.js project. It can also be used to add support for
      additional features to an existing project.
    `,
    examples: [
      [`Scaffold project interactively`, `npx create-bud-app`],
      [
        `Scaffold project in a target directory`,
        `npx create-bud-app my-project`,
      ],
      [
        `Scaffold project non-interactively`,
        `npx create-bud-app --no-interactive`,
      ],
      [
        `Add additional dependencies`,
        `npx create-bud-app --dependencies redux --dependencies react-router`,
      ],
      [
        `Add additional devDependencies`,
        `npx create-bud-app --devDependencies vitest`,
      ],
      [`Add support for swc`, `npx create-bud-app --support swc`],
      [
        `A complex non-interactive example`,
        `npx create-bud-app my-project --no-interactive --support react --support swc --support postcss --support eslint --name example-project --package-manager yarn`,
      ],
    ],
  })

  /**
   * --relativePath
   */
  public relativePath = Option.String({
    required: false,
  })

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
   * --devDependencies
   */
  public devDependencies = Option.Array(
    `--devDependencies,-dd`,
    [`@roots/bud`],
    {
      description: `Development dependencies to install`,
    },
  )

  /**
   * --dependencies
   */
  public dependencies = Option.Array(`--dependencies,-d`, [], {
    description: `Runtime dependencies to install`,
  })

  /**
   * --description
   */
  public description = Option.String(
    `--description,-desc`,
    `bud.js application`,
    {
      description: `Project description`,
    },
  )

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
  public support: supports = Option.Array(`--support,-s`, [], {
    description: `Support for various components`,
    validator: isArray(
      isOneOf([
        isLiteral(`swc`),
        isLiteral(`typescript`),
        isLiteral(`babel`),
        isLiteral(`emotion`),
        isLiteral(`sass`),
        isLiteral(`postcss`),
        isLiteral(`tailwindcss`),
        isLiteral(`wordpress`),
        isLiteral(`react`),
        isLiteral(`vue`),
        isLiteral(`eslint`),
        isLiteral(`stylelint`),
        isLiteral(`prettier`),
      ]),
    ),
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
    return execa(command, args, {
      cwd: this.directory,
      env: {
        ...process.env,
        NODE_ENV: `development`,
      },
    })
  }

  /**
   * Directory path
   */
  public get directory() {
    return normalize(join(this.cwd, this.relativePath ?? `./`))
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
   * Get file path for a project file
   */
  public projectPath(...args: Array<string>) {
    return normalize(join(this.directory, ...args))
  }

  /**
   * File or files exist in project
   */
  public exists(...args: Array<string>) {
    return args.some(arg => this.files.some(file => file.includes(arg)))
  }

  /**
   * Project files
   */
  public files: Array<string> = []

  /**
   * Project has a react compatible transpiler selected for install
   */
  public get hasReactCompatibleTranspiler() {
    const transpilers: supports = [`swc`, `babel`, `typescript`]
    return transpilers.some(entry => this.support.includes(entry))
  }

  /**
   * Project has an emotion compatible transpiler selected for install
   */
  public get hasEmotionCompatibleTranspiler() {
    const transpilers: supports = [`swc`, `babel`]
    return transpilers.some(entry => this.support.includes(entry))
  }

  /**
   * Create spinner instance
   */
  public createSpinner() {
    return ora({
      stream: this.context.stdout,
    })
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
    const projectPrompt = createProjectPrompt(this)
    const info = await projectPrompt.run()
    this.name = info.name
    this.description = info.description
    this.username = info.username
    this.license = info.license

    this.fs = new Filesystem(this.directory)
    this.files =
      (await this.fs.list(`./`))?.map(s => s.toLowerCase()) ?? []

    const packageManagerPrompt = createPackageManagerPrompt(this)
    const jsPrompt = createJsSupportPrompt(this)
    const cssPrompt = createCssSupportPrompt(this)
    const frameworkPrompt = createComponentsSupportPrompt(this)
    const envPrompt = createEnvPrompt(this)
    const testPrompt = createTestSupportPrompt(this)

    this.packageManager = await packageManagerPrompt.run()
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
    if (this.files?.length) {
      this.context.stdout.write(`${this.directory} is not empty.\n\n`)
    }

    if (this.support.includes(`react`)) {
      this.dependencies.push(`react`, `react-dom`)

      if (!this.hasReactCompatibleTranspiler) {
        this.support.push(`swc`)
        this.context.stdout.write(
          `A compatible JS compiler is required for React. Adding swc (@roots/bud-swc).\n\n`,
        )
      }
    }

    if (this.support.includes(`tailwindcss`)) {
      this.dependencies.push(`tailwindcss`)

      if (!this.support.includes(`postcss`)) {
        this.support.push(`postcss`)
        this.context.stdout.write(
          `PostCSS is required for TailwindCSS. Adding postcss (@roots/bud-postcss).\n\n`,
        )
      }
    }

    if (this.support.includes(`emotion`)) {
      if (!this.hasEmotionCompatibleTranspiler) {
        this.support.push(`swc`)
        this.context.stdout.write(
          `A compatible JS compiler is required for Emotion. Adding swc (@roots/bud-swc).\n\n`,
        )
      }
    }

    if (this.support.includes(`vue`)) this.dependencies.push(`vue`)

    if (!this.exists(`package.json`)) {
      await writePackageManifest(this)
    } else {
      this.context.stdout.write(`package.json already exists. Skipping.\n`)
    }

    if (!this.exists(`readme`)) {
      await writeReadme(this)
    } else {
      this.context.stdout.write(`README already exists. Skipping.\n`)
    }

    if (!this.exists(`src`)) {
      await writeSrcTask(this)
    } else {
      this.context.stdout.write(
        `source directory already exists. Skipping.\n`,
      )
    }

    if (!this.exists(`jsconfig`, `tsconfig`)) {
      await writeTsConfig(this)
    } else {
      this.context.stdout.write(
        `tsconfig or jsconfig already exists. Skipping.\n`,
      )
    }

    if (this.config) {
      if (!this.exists(`bud`)) {
        await writeConfig(this)
      } else {
        this.context.stdout.write(`bud config already exists. Skipping.\n`)
      }
    }

    if (this.support.includes(`tailwindcss`)) {
      if (!this.exists(`tailwind`)) {
        await writeTailwindConfig(this)
      } else {
        this.context.stdout.write(
          `tailwind config already exists. Skipping.\n`,
        )
      }
    }

    if (this.support.includes(`eslint`)) {
      this.devDependencies.push(`@roots/eslint-config`)
      if (!this.exists(`eslint`)) {
        await writeEslintConfig(this)
      } else {
        this.context.stdout.write(
          `eslint config already exists. Skipping.\n`,
        )
      }
    }

    if (this.support.includes(`stylelint`)) {
      if (!this.exists(`stylelint`)) {
        await writeStylelintConfig(this)
      } else {
        this.context.stdout.write(
          `stylelint config already exists. Skipping.\n`,
        )
      }
    }

    if (this.support.includes(`prettier`)) {
      if (!this.exists(`prettier`)) {
        await writePrettierConfig(this)
      } else {
        this.context.stdout.write(
          `prettier config already exists. Skipping.\n`,
        )
      }
    }

    await writeGitignoreConfigTask(this)
    await installDevTask(this)
    await installProdTask(this)
    await buildTask(this)
  }
}
