/* eslint-disable n/no-process-env */

import {dirname, join, normalize, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import {Filesystem} from '@roots/filesystem'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import isUndefined from 'lodash/isUndefined.js'
import ora from 'ora'
import {isArray, isLiteral, isOneOf} from 'typanion'

import createConfirmPrompt from '../prompts/confirmExisting.js'
import createPackageManagerPrompt from '../prompts/packageManager.js'
import createProjectPrompt from '../prompts/project.js'
import createComponentsSupportPrompt from '../prompts/support.components.js'
import createCssSupportPrompt from '../prompts/support.css.js'
import createEnvPrompt from '../prompts/support.env.js'
import createJsSupportPrompt from '../prompts/support.js.js'
import createTestSupportPrompt from '../prompts/support.qa.js'
import buildTask from '../tasks/build.js'
import installDevDependenciesTask from '../tasks/install.dev.js'
import installProductionDependenciesTask from '../tasks/install.prod.js'
import writeConfigTask from '../tasks/write.bud.config.js'
import writeEslintConfigTask from '../tasks/write.eslint.config.js'
import writeGitignoreConfigTask from '../tasks/write.gitignore.js'
import writePackageJSONTask from '../tasks/write.package.js'
import writePrettierConfigTask from '../tasks/write.prettier.config.js'
import writeReadmeTask from '../tasks/write.readme.js'
import writeSrcTask from '../tasks/write.src.js'
import writeStylelintConfigTask from '../tasks/write.stylelint.config.js'
import writeTailwindConfigTask from '../tasks/write.tailwind.config.js'
import writeTsConfigTask from '../tasks/write.tsconfig.js'
import getGitUser from '../utilities/getGitUser.js'
import getLatestVersion from '../utilities/getLatestVersion.js'

type Supports =
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
      [`Scaffold project interactively`, `npx @roots/create-bud-app`],
      [
        `Scaffold project non-interactively`,
        `npx @roots/create-bud-app --no-interactive`,
      ],
      [
        `Scaffold project in a target directory`,
        `npx @roots/create-bud-app my-project`,
      ],
      [
        `Confirm intent to run scaffolder in a non-empty directory`,
        `npx @roots/create-bud-app my-project --confirm-existing`,
      ],
      [
        `Allow scaffold to overwrite project files`,
        `npx @roots/create-bud-app --overwrite`,
      ],
      [`Add support for swc`, `npx @roots/create-bud-app --support swc`],
      [
        `Add additional dependencies`,
        `npx @roots/create-bud-app --dependencies redux --dependencies react-router`,
      ],
      [
        `Add additional devDependencies`,
        `npx @roots/create-bud-app --devDependencies vitest`,
      ],
      [
        `A complex non-interactive example`,
        `npx @roots/create-bud-app my-project --no-interactive --support react --support swc --support postcss --support eslint --name example-project --package-manager yarn`,
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
   * --confirm-existing
   */
  public confirmExisting = Option.Boolean(`--confirm-existing,-c`, false, {
    description: `Confirm usage in existing directory`,
  })

  /**
   * --cwd
   */
  public cwd = Option.String(`--cwd`, process.cwd(), {
    description: `Current working directory`,
  })

  /**
   * --devDependencies
   */
  public devDependencies = Option.Array(
    `--dev-dependencies,--devDependencies,-dd`,
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
    `project bootstrapped with @roots/create-bud-app`,
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
  public name = Option.String(`--name,-n`, undefined, {
    description: `Project name`,
  })

  /**
   * --overwrite
   */
  public overwrite = Option.Boolean(`--overwrite,-o`, undefined, {
    description: `Overwrite existing files`,
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
  public support: Array<Supports> = Option.Array(`--support,-s`, [], {
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
  public extensions: Record<`${Supports & string}`, string> = {
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
    prettier: `@roots/bud-prettier`,
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
    return normalize(join(this.cwd, this.relativePath ?? ``))
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
   * Project has a react compatible compiler selected for install
   */
  public get hasReactCompatibleCompiler() {
    const compilers: Array<Supports> = [`swc`, `babel`, `typescript`]
    return compilers.some(entry => this.support.includes(entry))
  }

  /**
   * Project has an emotion compatible compiler selected for install
   */
  public get hasEmotionCompatibleCompiler() {
    const compilers: Array<Supports> = [`swc`, `babel`]
    return compilers.some(entry => this.support.includes(entry))
  }

  /**
   * Create spinner instance
   */
  public createSpinner() {
    return ora({stream: this.context.stdout})
  }

  /**
   * Execute
   */
  public async execute() {
    await this.header()

    this.fs = new Filesystem(this.directory)
    this.files =
      (await this.fs.list(`./`))?.map(s => s.toLowerCase()) ?? []

    this.name = this.name ?? this.relativePath?.split(sep).pop() ?? `app`

    if (isUndefined(this.username)) this.username = await getGitUser(this)
    if (isUndefined(this.version)) this.version = await getLatestVersion()

    if (this.files.length && !this.confirmExisting && !this.overwrite) {
      if (!this.interactive) {
        this.context.stderr.write(
          `Cannot proceed with scaffolding\n\n${this.directory} is not empty and the --no-interactive flag is set.\n\nAppend the --confirm-existing flag to confirm your intent or --overwrite to allow overwriting of existing files.\n`,
        )
        return 1
      } else {
        const result = await createConfirmPrompt(this).run()
        if (!result) return 0
      }
    }

    if (this.interactive) await this.runPrompts()

    await this.runTasks()

    await this.post()

    return 0
  }

  /**
   * CLI header
   */
  public async header() {
    this.context.stdout.write(
      `\n@roots/create-bud-app (preview release)\n\n`,
    )
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
    Object.assign(this, await createProjectPrompt(this).run())

    this.packageManager = await createPackageManagerPrompt(this).run()

    this.support.push(...(await createEnvPrompt(this).run()))
    this.support.push(...(await createJsSupportPrompt(this).run()))
    this.support.push(...(await createCssSupportPrompt(this).run()))
    this.support.push(...(await createComponentsSupportPrompt(this).run()))
    this.support.push(...(await createTestSupportPrompt(this).run()))

    this.context.stdout.write(`\n`)
  }

  /**
   * Run tasks
   */
  public async runTasks() {
    if (this.support.includes(`react`)) {
      this.dependencies.push(`react`, `react-dom`)
      if (!this.hasReactCompatibleCompiler) {
        this.support.push(`swc`)
        this.createSpinner().warn(
          `A compatible JS compiler is required for React. Adding swc (@roots/bud-swc).\n`,
        )
      }
    }

    if (this.support.includes(`tailwindcss`)) {
      this.dependencies.push(`tailwindcss`)
      if (!this.support.includes(`postcss`)) {
        this.support.push(`postcss`)
        this.createSpinner().warn(
          `PostCSS is required for TailwindCSS. Adding postcss (@roots/bud-postcss).\n`,
        )
      }
    }

    if (this.support.includes(`emotion`)) {
      if (!this.hasEmotionCompatibleCompiler) {
        this.support.push(`swc`)
        this.createSpinner().warn(
          `A compatible JS compiler is required for Emotion. Adding swc (@roots/bud-swc).\n`,
        )
      }
    }

    if (this.support.includes(`vue`)) this.dependencies.push(`vue`)

    await writePackageJSONTask(this)
    await writeReadmeTask(this)
    await writeGitignoreConfigTask(this)
    await writeTsConfigTask(this)
    await writeConfigTask(this)
    await writeSrcTask(this)
    await writeStylelintConfigTask(this)
    await writePrettierConfigTask(this)
    await writeEslintConfigTask(this)
    await writeTailwindConfigTask(this)

    this.context.stdout.write(`\n`)

    await installDevDependenciesTask(this)
    await installProductionDependenciesTask(this)
    await buildTask(this)
  }
}
