/* eslint-disable n/no-process-env */

import {dirname, join, normalize, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import {Filesystem} from '@roots/filesystem'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import isUndefined from 'lodash/isUndefined.js'
import ora from 'ora'

import confirmExistingFlag from '../flags/confirm-existing.js'
import cwdFlag from '../flags/cwd.js'
import dependenciesFlag from '../flags/dependencies.js'
import descriptionFlag from '../flags/description.js'
import devDependenciesFlag from '../flags/dev-dependencies.js'
import interactiveFlag from '../flags/interactive.js'
import licenseFlag from '../flags/license.js'
import nameFlag from '../flags/name.js'
import overwriteFlag from '../flags/overwrite.js'
import packageManagerFlag from '../flags/package-manager.js'
import supportFlag from '../flags/support.js'
import usernameFlag from '../flags/username.js'
import versionFlag from '../flags/version.js'
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
import type {Supports} from '../types.js'
import getGitUser from '../utilities/getGitUser.js'
import getLatestVersion from '../utilities/getLatestVersion.js'

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
      This command interactively scaffolds a new bud.js project. It can also be used to add support for
      additional features to an existing project. It supports:

      \`babel\`, \`emotion\`, \`eslint\`, \`postcss\`, \`prettier\`, \`react\`, \`sass\`, \`stylelint\`, \`swc\`, \`tailwindcss\`, \`typescript\`, \`vue\`, \`wordpress\`

      If ran on its own the command will attempt to build the project scaffolding in the current working directory:

      \`npx @roots/create-bud-app\`

      The command accepts an optional positional argument indicating the path to the directory you want to scaffold the project in. This path should be
      expressed relative to the current working directory. The directory will be created if it does not exist.

      \`npx @roots/create-bud-app my-project\`

      If the directory is not empty the command will prompt you to confirm that you want to continue. You can skip this prompt by passing the \`--confirm-existing\` flag.

      \`npx @roots/create-bud-app my-project --confirm-existing\`

      By default, this command will not overwrite files which are in conflict. Run with the \`--overwrite\` flag to change this behavior.

      \`npx @roots/create-bud-app my-project --overwrite\`

      The command can be used non-interactively by passing the \`--no-interactive\` flag.

      \`npx @roots/create-bud-app my-project --no-interactive\`

      Command options which accept multiple values can be passed multiple times. For example, to add support for \`swc\` and \`postcss\`:

      \`npx @roots/create-bud-app my-project --support swc --support postcss\`
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
  public relativePath = Option.String({required: false})

  /**
   * --confirm-existing
   */
  public confirmExisting = confirmExistingFlag

  /**
   * --cwd
   */
  public cwd = cwdFlag

  /**
   * --devDependencies
   */
  public devDependencies = devDependenciesFlag

  /**
   * --dependencies
   */
  public dependencies = dependenciesFlag

  /**
   * --description
   */
  public description = descriptionFlag

  /**
   * --interactive
   */
  public interactive = interactiveFlag

  /**
   * --license
   */
  public license = licenseFlag

  /**
   * --name
   */
  public name = nameFlag

  /**
   * --overwrite
   */
  public overwrite = overwriteFlag

  /**
   * --package-manager
   */
  public packageManager = packageManagerFlag

  /**
   * --support
   */
  public support: Array<Supports> = supportFlag

  /**
   * --username
   */
  public username = usernameFlag

  /**
   * --version
   */
  public version = versionFlag

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
    await this.before()

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

    this.context.stdout.write(`\n`)

    await this.runTasks()

    this.context.stdout.write(`\n`)

    await this.after()
  }

  /**
   * CLI before
   */
  public async before() {
    ;[
      `\n@roots/create-bud-app (preview release)\n\n`,
      `Run \`npx @roots/create-bud-app --help\` for usage information.\n\n`,
    ].map(message => this.context.stdout.write(message))
  }

  /**
   * CLI after
   */
  public async after() {
    ;[
      `Project ready for you to start building!\n\n`,
      `Navigate to ${this.directory} and run \`${
        this.packageManager === `yarn` ? `yarn` : `npx`
      } bud dev\` to get started.\n\n`,
      `When you are ready to deploy, run \`${
        this.packageManager === `yarn` ? `yarn` : `npx`
      } bud build\` to compile your project for production.\n\n`,
      `Happy hacking!\n\n`,
    ].map(message => this.context.stdout.write(message))
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

    this.context.stdout.write(`\n`)

    await buildTask(this)
  }
}
