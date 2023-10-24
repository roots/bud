/* eslint-disable react/no-unescaped-entities */
import type {Extension} from '@roots/bud-framework/extension'

import {platform} from 'node:os'

import BudCommand from '@roots/bud/cli/commands'
import {Error} from '@roots/bud-dashboard/components/error'
import {Command} from '@roots/bud-support/clipanion'
import {BudError, InputError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'
import webpack from '@roots/bud-support/webpack'

import {WinError} from './WinError.js'
import DisplayConfigFiles from '../config/displayConfigFiles.js'
import DisplayEnv from '../env/displayEnv.js'

/**
 * bud doctor command
 */
export default class DoctorCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`doctor`]]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = Command.Usage({
    category: `debug`,
    description: `Check project for common errors`,
    details: `\
The \`bud doctor\` command will:

1. validate the \`production\` configuration with \`webpack\`

\`webpack\` exports a \`validate\` function which is used by this command to verify that
the configuration matches the \`webpack\` configuration schema.

2. check the \`dependencies\` and \`devDependencies\` in the \`package.json\` file.

In general, \`bud.js\` dependencies should be kept at the same version. This script doesn't account
for a lot of edge cases so it might return a false positive.
`,
    examples: [
      [`Check project for common configuration issues`, `$0 doctor`],
    ],
  })

  public disabledExtensions: Array<[string, Extension]> = []

  public enabledExtensions: Array<[string, Extension]> = []

  public entrypoints: Array<[string, webpack.EntryObject]> = []

  public makeTimer = () => {
    const start = process.hrtime()

    return () => {
      const end = process.hrtime(start)
      return this.seconds(end)
    }
  }

  public resolvedDependencies: Record<string, string> = {}

  public override silent = true

  public timings: Record<string, string> = {}

  /**
   * Execute command
   */
  public override async execute() {
    const {Doctor} = await import(`./Doctor.js`)

    const buildTimer = this.makeTimer()
    await this.makeBud()

    this.timings.build = buildTimer()

    if (platform() === `win32`) {
      this.renderStatic(<WinError />)
    }

    const name = this.bud.context.manifest.name
      ? this.bud.context.manifest.name
      : this.bud.path()

    this.renderStatic(<Doctor name={name} timings={this.timings} />)

    if (this.bud.hasChildren) {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">Child compilers{`\n`}</Text>

          {Object.values(this.bud.children).map((child, i) => (
            <Box flexDirection="row" key={i}>
              <Text>{figures.triangleRightSmall}</Text>
              <Text>{` `}</Text>
              <Text>{child.label}</Text>
            </Box>
          ))}
          <Text>{` `}</Text>
          <Text>
            Note that not all `bud doctor` checks are not currently
            compatible with multi-compiler builds.
          </Text>
        </Box>,
      )
    }

    this.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">Mode</Text>
        <Text>{this.bud.mode}</Text>
      </Box>,
    )

    this.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">Project paths</Text>
        <Text>{` `}</Text>
        <Text>project: {this.bud.path()}</Text>

        <Text>
          input:{` `}
          {this.bud.path(`@src`).replace(this.bud.path(), `@project`)}
        </Text>

        <Text>
          output:{` `}
          {this.bud.path(`@dist`).replace(this.bud.path(), `@project`)}
        </Text>

        <Text>
          cache:{` `}
          {this.bud.path(`@os-cache`)}
        </Text>

        <Text>
          storage:{` `}
          {this.bud.path(`@storage`).replace(this.bud.path(), `@project`)}
        </Text>
      </Box>,
    )

    this.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">Checking versions of core packages</Text>
        <Text>{` `}</Text>
        {await this.packageCheck(`@roots/bud-api`)}
        {await this.packageCheck(`@roots/bud-build`)}
        {await this.packageCheck(`@roots/bud-cache`)}
        {await this.packageCheck(`@roots/bud-dashboard`)}
        {await this.packageCheck(`@roots/bud-extensions`)}
        {await this.packageCheck(`@roots/bud-framework`)}
        {await this.packageCheck(`@roots/bud-hooks`)}
        {await this.packageCheck(`@roots/bud-server`)}
        {await this.packageCheck(`@roots/bud-support`)}
      </Box>,
    )

    try {
      await this.bud.build.make()
    } catch (error) {
      console.error(error)
    }

    this.renderStatic(<DisplayConfigFiles bud={this.bud} />)
    this.renderStatic(<DisplayEnv bud={this.bud} />)

    try {
      this.entrypoints = this.bud.build.config.entry
        ? Object.entries(this.bud.build.config.entry)
        : []

      await Promise.all(
        Object.entries(this.bud.extensions.repository).map(
          async ([name, extension]: [string, Extension]) => {
            if (extension.isEnabled()) {
              return this.enabledExtensions.push([name, extension])
            }
            return this.disabledExtensions.push([name, extension])
          },
        ),
      )
    } catch (error) {
      console.error(error)
    }

    this.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">Enabled extensions{`\n`}</Text>
        {this.mapExtensions(this.enabledExtensions)}
      </Box>,
    )
    this.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">Disabled extensions{`\n`}</Text>
        {this.mapExtensions(this.disabledExtensions)}
      </Box>,
    )

    try {
      if (
        !this.bud.hasChildren &&
        this.entrypoints &&
        this.entrypoints.length === 1 &&
        this.entrypoints[0][0] === `main` &&
        this.entrypoints[0][1].import[0] === `index` &&
        !(await this.bud.fs.exists(this.bud.path(`@src/index.js`)))
      ) {
        this.renderStatic(
          <Error
            error={
              new InputError(`No entrypoint specified`, {
                details: `No entrypoint was specified and there is also no file resolvable at \`${this.bud.relPath(
                  `@src/index.js`,
                )}\`. Either specify an entrypoint or create a file at \`${this.bud.relPath(
                  `@src/index.js`,
                )}\`.`,
              })
            }
          />,
        )
      }
    } catch (error) {
      this.catch(error)
    }

    if (this.bud.mode === `development`) {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">Development server</Text>
          <Box flexDirection="row">
            <Text>URL:</Text>
            <Text>
              {` `}
              {this.bud.server.url.href}
            </Text>
          </Box>

          {this.bud.server?.enabledMiddleware &&
            Object.keys(this.bud.server.enabledMiddleware).includes(
              `proxy`,
            ) &&
            this.bud.server.proxyUrl && (
              <Box flexDirection="row">
                <Text>Proxy:</Text>
                <Text>
                  {` `}
                  {this.bud.server.proxyUrl.href}
                </Text>
              </Box>
            )}
        </Box>,
      )
    }

    try {
      webpack.validate(this.bud.build.config)

      this.renderStatic(
        <Box>
          <Text color="green">
            {figures.tick} webpack validated configuration
          </Text>
        </Box>,
      )
    } catch (error) {
      this.renderStatic(
        <Box>
          <Text color="red">❌ {error?.message ?? error}</Text>
        </Box>,
      )
    }
  }

  public mapExtensions(extensions: Array<[string, Extension]>) {
    return extensions.map(([name, extension]) => (
      <Box flexDirection="column" key={`extension-${name}`}>
        <Text color="white">
          {figures.triangleRightSmall} {name}
        </Text>
      </Box>
    ))
  }

  public async packageCheck(signifier: string) {
    const manifest = await this.bud.module.getManifestPath(signifier)
    const {version: packageVersion} = await this.bud.fs.read(manifest)
    if (packageVersion !== this.bud.context.bud.version) {
      return (
        <Error
          error={BudError.normalize(`${signifier} is not installed at the same version as @roots/bud (required: ${this.bud.context.bud.version}, installed: ${packageVersion}).
          Your installation may be corrupted or your package manager may have cached an outdated module; consider reinstalling with the \`--force\` flag.`)}
        />
      )
    } else {
      return (
        <Text>
          <Text color="green">
            {figures.tick} {signifier} meets requirements
          </Text>
          {` `}
          (required:{` `}
          {this.bud.context.bud.version}, installed: {packageVersion})
        </Text>
      )
    }
  }

  public seconds(hrTime: [number, number]) {
    return (hrTime[0] + hrTime[1] / 1e9).toFixed(2)
  }
}
