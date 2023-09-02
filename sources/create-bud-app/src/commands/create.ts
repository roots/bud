import type {Options as OraOptions} from 'ora'

import {dirname, join, normalize, relative, resolve, sep} from 'node:path'
import {env} from 'node:process'
import {fileURLToPath} from 'node:url'

import {Filesystem} from '@roots/filesystem'
import chalk from 'chalk'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import figures from 'figures'
import isUndefined from 'lodash/isUndefined.js'
import ora from 'ora'

import type {Supports} from '../types.js'

import confirmExistingFlag from '../flags/confirm-existing.js'
import customizeFlag from '../flags/customize.js'
import cwdFlag from '../flags/cwd.js'
import dependenciesFlag from '../flags/dependencies.js'
import descriptionFlag from '../flags/description.js'
import devDependenciesFlag from '../flags/dev-dependencies.js'
import htmlFlag from '../flags/html.js'
import interactiveFlag from '../flags/interactive.js'
import licenseFlag from '../flags/license.js'
import nameFlag from '../flags/name.js'
import overwriteFlag from '../flags/overwrite.js'
import packageManagerFlag from '../flags/package-manager.js'
import reactPresetFlag from '../flags/react.js'
import recommendedPresetFlag from '../flags/recommended.js'
import supportFlag from '../flags/support.js'
import usernameFlag from '../flags/username.js'
import versionFlag from '../flags/version.js'
import wordpressPresetFlag from '../flags/wordpress.js'
import extensionsMap from '../mappedExtensions.js'
import createConfirmPrompt from '../prompts/confirmExisting.js'
import createHtmlPrompt from '../prompts/html.js'
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
import writeYarnLockfile from '../tasks/write.yarn.lock.js'
import writeYarnRCTask from '../tasks/write.yarnrc.js'
import yarnVersionTask from '../tasks/yarn-version.js'
import getGitUser from '../utilities/getGitUser.js'
import getLatestVersion from '../utilities/getLatestVersion.js'

/**
 * create-bud-app command
 */
export default class CreateCommand extends Command {
  public static override paths = [Command.Default]

  public static override usage = Command.Usage({
    description: `Scaffolding tool for bud.js projects`,
    details: `
      This command interactively scaffolds a new bud.js project. It can also be used to add support for
      additional features to an existing project. It supports:

      \`babel\`, \`emotion\`, \`eslint\`, \`postcss\`, \`prettier\`, \`react\`, \`sass\`, \`stylelint\`, \`swc\`, \`tailwindcss\`, \`typescript\`, \`vue\`, \`wordpress\`

      If ran on its own the command will attempt to build the project scaffolding in the current working directory:

      \`npx create-bud-app\`

      There are several presets which can be used to quickly scaffold a project with support for common features:

      \`npx create-bud-app --recommended\`

      \`npx create-bud-app --wordpress\`

      \`npx create-bud-app --react\`

      Presets are installed non-interactively. If you want to customize the project you can use the \`--customize\` flag:

      \`npx create-bud-app --wordpress --customize\`

      The command accepts an optional positional argument indicating the path to the directory you want to scaffold the project in. This path should be
      expressed relative to the current working directory. The directory will be created if it does not exist.

      \`npx create-bud-app my-project\`

      If the directory is not empty the command will prompt you to confirm that you want to continue. You can skip this prompt by passing the \`--confirm-existing\` flag.

      \`npx create-bud-app my-project --confirm-existing\`

      By default, this command will not overwrite files which are in conflict. Run with the \`--overwrite\` flag to change this behavior.

      \`npx create-bud-app my-project --overwrite\`

      The command can be used non-interactively by passing the \`--no-interactive\` flag.

      \`npx create-bud-app my-project --no-interactive\`

      Command options which accept multiple values can be passed multiple times. For example, to add support for \`swc\` and \`postcss\`:

      \`npx create-bud-app my-project --support swc --support postcss\`
    `,
    examples: [
      [`Scaffold new project in interactive mode`, `npx create-bud-app`],
      [
        `Scaffold project non-interactively`,
        `npx create-bud-app --no-interactive`,
      ],
      [
        `Scaffold project with support for recommended features`,
        `npx create-bud-app --recommended`,
      ],
      [
        `Scaffold project in a target directory`,
        `npx create-bud-app my-project`,
      ],
      [
        `Confirm intent to run scaffolder in a non-empty directory`,
        `npx create-bud-app my-project --confirm-existing`,
      ],
      [
        `Allow scaffold to overwrite project files`,
        `npx create-bud-app --overwrite`,
      ],
      [`Add support for swc`, `npx create-bud-app --support swc`],
      [
        `Skip html generation (for use with things like Laravel and WordPress)`,
        `npx create-bud-app --no-html`,
      ],
      [
        `Add additional dependencies`,
        `npx create-bud-app --dependencies redux --dependencies react-router`,
      ],
      [
        `Add additional devDependencies`,
        `npx create-bud-app --devDependencies vitest`,
      ],
      [
        `A complex non-interactive example`,
        `npx create-bud-app vanilla-app --no-interactive -p yarn -s swc -s postcss -d redux`,
      ],
    ],
  })

  public confirmExisting = confirmExistingFlag

  public customize = customizeFlag

  public cwd = cwdFlag

  public dependencies = dependenciesFlag

  public description = descriptionFlag

  public devDependencies = devDependenciesFlag

  public extensions = extensionsMap

  public files: Array<string> = []

  public fs: Filesystem

  public html = htmlFlag

  public interactive = interactiveFlag

  public license = licenseFlag

  public name = nameFlag

  public overwrite = overwriteFlag

  public packageManager = packageManagerFlag

  public react = reactPresetFlag

  public recommended = recommendedPresetFlag

  public relativePath = Option.String({required: false})

  public support = supportFlag

  public username? = usernameFlag

  public version? = versionFlag

  public wordpress = wordpressPresetFlag

  /**
   * CLI after
   */
  public async after() {
    const messages = [`🎉 Project ready for you to start building!`]

    let devMessage = this.relativePath
      ? `Navigate to ${chalk.blueBright(
          `./${relative(this.cwd, this.directory)}`,
        )} and run`
      : `Run`

    if ([`yarn classic`, `yarn`].includes(this.packageManager)) {
      devMessage = `${devMessage} ${chalk.blueBright(`yarn bud dev`)}`
    }
    if (this.packageManager === `pnpm`) {
      devMessage = `${devMessage} ${chalk.blueBright(`pnpm bud dev`)}`
    }
    if (this.packageManager === `npm`) {
      devMessage = `${devMessage} ${chalk.blueBright(`npx bud dev`)}`
    }

    messages.push(`${devMessage} to get started.`)

    let buildMessage = `When you are ready to deploy, run`

    if ([`yarn classic`, `yarn`].includes(this.packageManager)) {
      buildMessage = `${buildMessage} ${chalk.blueBright(`yarn bud build`)}`
    }
    if (this.packageManager === `pnpm`) {
      buildMessage = `${buildMessage} ${chalk.blueBright(
        `pnpm bud build`,
      )}`
    }
    if (this.packageManager === `npm`) {
      buildMessage = `${buildMessage} ${chalk.blueBright(
        `npx bud build`,
      )}`
    }

    messages.push(
      `${buildMessage} to compile your project for production.`,
      `Happy hacking!`,
    )

    this.context.stdout.write(messages.join(`\n\n`))
  }

  /**
   * CLI before
   */
  public async before() {
    this.context.stdout.write(
      `${chalk.blue(`\ncreate-bud-app`)} (preview release)`,
    )

    if (isUndefined(this.name))
      this.name = this.relativePath?.split(sep).pop() ?? `app`
    if (isUndefined(this.username)) this.username = await getGitUser(this)
    if (isUndefined(this.version)) this.version = await getLatestVersion()

    this.fs = new Filesystem(this.directory)
    this.files =
      (await this.fs.list(`./`))?.map(s => s.toLowerCase()) ?? []

    if (this.interactive) {
      this.context.stdout.write(`\n\n`)
      this.context.stdout.write(
        `Run ${chalk.blue(
          `npx create-bud-app --help`,
        )} for usage information.`,
      )
    }

    if (this.wordpress) {
      this.support.push(`wordpress`, `swc`, `postcss`)
      this.html = false
      if (!this.customize) this.interactive = false
    }

    if (this.recommended) {
      this.support.push(`swc`, `postcss`)
      if (!this.customize) this.interactive = false
    }

    if (this.react) {
      this.support.push(`swc`, `postcss`, `react`)
      if (!this.customize) this.interactive = false
    }

    /**
     * Handle non-empty directory
     */
    if (this.files.length && !this.confirmExisting && !this.overwrite) {
      /**
       * Interactive users have a chance to enable
       */
      if (this.interactive) {
        const confirmation = await createConfirmPrompt(this).run()
        if (!confirmation) throw new Error(`User cancelled scaffolding`)
        return
      }

      /**
       * Non-interactive users are out of luck
       */
      this.context.stderr.write(`\n\n`)
      this.context.stderr.write(`${chalk.red(figures.cross)} Error`)
      this.context.stderr.write(`\n\n`)

      this.context.stderr.write(
        `Target directory ${chalk.blueBright(
          `./${relative(this.cwd, this.directory)}`,
        )} is not empty and the ${chalk.magenta(
          `--no-interactive`,
        )} flag is set.`,
      )
      this.context.stderr.write(`\n\n`)

      this.context.stderr.write(
        `Append the ${chalk.magenta(
          `--confirm-existing`,
        )} flag to confirm your intent or ${chalk.magenta(
          `--overwrite`,
        )} to allow overwriting of existing files.`,
      )
      this.context.stderr.write(`\n\n`)

      throw new Error()
    }
  }

  /**
   * Path to root of `create-bud-app`
   */
  public get createRoot() {
    return resolve(
      this.cwd,
      join(dirname(fileURLToPath(import.meta.url)), `..`, `..`),
    )
  }

  /**
   * Create spinner instance
   */
  public createSpinner(options: OraOptions = {}) {
    return ora({
      stream: this.context.stdout,
      ...options,
    })
  }

  /**
   * Directory path
   */
  public get directory() {
    return normalize(join(this.cwd, this.relativePath ?? ``))
  }

  /**
   * Execute
   */
  public async execute() {
    await this.before()

    if (this.interactive) await this.runPrompts()
    else this.context.stdout.write(`\n`)

    this.context.stdout.write(`\n`)

    await this.runTasks()

    this.context.stdout.write(`\n`)

    await this.after()

    this.context.stdout.write(`\n`)
  }

  /**
   * File or files exist in project
   */
  public exists(...args: Array<string>) {
    return args.some(arg => this.files.some(file => file.includes(arg)))
  }

  /**
   * Project has an emotion compatible compiler selected for install
   */
  public get hasEmotionCompatibleCompiler() {
    const compilers: Array<Supports> = [`swc`, `babel`]
    return compilers.some(entry => this.support.includes(entry))
  }

  /**
   * Project has a react compatible compiler selected for install
   */
  public get hasReactCompatibleCompiler() {
    const compilers: Array<Supports> = [`swc`, `babel`, `typescript`]
    return compilers.some(entry => this.support.includes(entry))
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
    this.html = await createHtmlPrompt(this).run()
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

    if (this.support.includes(`vue`)) {
      this.dependencies.push(`vue`)
    }

    if (this.support.includes(`eslint`)) {
      this.devDependencies.push(`@roots/eslint-config`)

      if (
        this.support.includes(`swc`) &&
        !this.support.includes(`typescript`)
      ) {
        this.devDependencies.push(`typescript`)
      }
    }

    await writePackageJSONTask(this)
    await writeReadmeTask(this)
    await yarnVersionTask(this)
    await writeYarnRCTask(this)
    await writeYarnLockfile(this)
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

    try {
      // 😇
      await this.sh(`open`, [`raycast://confetti`])
    } catch (error) {}
  }

  /**
   * Run arbitrary shell commands
   */
  public async sh(command: string, args: string[]) {
    return execa(command, args, {
      cwd: this.directory,
      env: {...env, NODE_ENV: `development`},
    })
  }
}
