/* eslint-disable react/no-unescaped-entities */
import type {Bud} from '@roots/bud'
import type {Context} from '@roots/bud-framework/context'
import type {Extension} from '@roots/bud-framework/extension'
import type {InspectTreeResult} from 'fs-jetpack/types.js'

import {Error} from '@roots/bud-dashboard/app'
import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, InputError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, Spacer, Text} from '@roots/bud-support/ink'
import prettyFormat from '@roots/bud-support/pretty-format'
import webpack from '@roots/bud-support/webpack'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'

import {isWindows} from './isWindows.js'
import {WinError} from './WinError.js'

/**
 * bud doctor command
 */
@dry
export default class BudDoctorCommand extends BudCommand {
  public static override paths = [[`doctor`]]

  public static override usage = Command.Usage({
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
      [`Check compiled configuration against webpack`, `$0 doctor`],
    ],
  })

  public configuration: Bud[`build`][`config`]

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

  public timings: Record<string, string> = {}

  /**
   * {@link Command.withContext}
   */
  public override withContext = async (context: Context) => {
    return {...context, cache: false, dry: true, silent: true}
  }
  /**
   * Execute command
   */
  public override async execute() {
    const {Doctor} = await import(`./Doctor.js`)

    const buildTimer = this.makeTimer()
    await this.makeBud()
    await this.bud.run()

    this.timings.build = buildTimer()

    if (isWindows()) {
      this.renderStatic(<WinError />)
    }

    const name = this.bud.context.manifest.name
      ? this.bud.context.manifest.name
      : this.bud.path()

    this.renderStatic(<Doctor name={name} timings={this.timings} />)

    if (await this.bud.fs.exists(this.bud.cache.cacheDirectory)) {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="yellow">
            {figures.info} Detected compilation cache
          </Text>
          <Spacer />
          <Text>
            If you are experiencing issues with bud.js you should start by
            clearing the cache.{`\n`}
          </Text>
          <Text>
            {figures.triangleRightSmall} To delete this directory with the
            CLI run{` `}
            <Text color="green">`bud clean`</Text>, or;
          </Text>
          <Text>
            {figures.triangleRightSmall} Use the{` `}
            <Text color="green">`--force`</Text> flag on your next build
          </Text>
        </Box>,
      )
    }

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

    this.renderStatic(
      <Box flexDirection="column">
        <Text color="blue">Mode</Text>
        <Text>{this.bud.mode}</Text>
      </Box>,
    )

    const configFiles = (
      this.bud.context.files ? Object.values(this.bud.context.files) : []
    ).filter(({bud}) => bud)
    if (configFiles.length) {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">Bud configuration files{`\n`}</Text>
          {configFiles.map(({name, path}, i) => (
            <Box key={i}>
              <Text>
                {figures.triangleRightSmall} {name}
              </Text>
              <Text>{` `}</Text>
              <Text dimColor>
                {path.replace(this.bud.context.basedir, `.`)}
              </Text>
            </Box>
          ))}
        </Box>,
      )
    } else {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">Registered configurations{`\n`}</Text>
          <Text dimColor>No configuration files found in project</Text>
        </Box>,
      )
    }

    try {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">Config API calls{`\n`}</Text>
          <Text></Text>
          {!this.bud.api.trace.length ? (
            <Text dimColor>No config calls logged</Text>
          ) : (
            this.bud.api.trace.map(([fn, args], i) => (
              <Box flexDirection="row" key={i}>
                <Text>
                  {figures.triangleRightSmall} {fn}
                </Text>
                <Text>{` `}</Text>
                <Text dimColor>
                  {args.map(this.bud.fs.json.stringify).join(`, `)}
                </Text>
              </Box>
            ))
          )}
        </Box>,
      )
    } catch (error) {
      this.renderStatic(<Error error={BudError.normalize(error)} />)
    }

    try {
      this.configuration = await this.bud.build.make()
      this.entrypoints = this.configuration.entry
        ? Object.entries(this.configuration.entry)
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
      this.renderStatic(<Error error={BudError.normalize(error)} />)
    }

    if (this.bud.env) {
      try {
        this.renderStatic(
          <Box flexDirection="column">
            <Text color="blue">Environment{`\n`}</Text>
            {this.bud.env.getEntries().map(([key, value]) => {
              const color = value.length === 0 ? `yellow` : `dimColor`
              return (
                <Box flexDirection="row" key={key}>
                  <Text>{figures.triangleRightSmall}</Text>
                  <Text>{` `}</Text>
                  <Text color={color}>{key}</Text>
                  <Text>{` `}</Text>

                  <Text color={color}>
                    {value.length > 0 ? `************` : `empty string`}
                  </Text>
                </Box>
              )
            })}
          </Box>,
        )
      } catch (error) {
        this.renderStatic(<Error error={BudError.normalize(error)} />)
      }
    }

    if (this.enabledExtensions) {
      try {
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
      } catch (error) {
        this.renderStatic(<Error error={BudError.normalize(error)} />)
      }
    }

    if (
      !this.bud.hasChildren &&
      this.entrypoints.length === 1 &&
      this.entrypoints[0][0] === `main` &&
      this.entrypoints[0][1].import[0] === `index` &&
      !(await this.bud.fs.exists(this.bud.path(`@src/index.js`)))
    ) {
      this.renderStatic(
        <Error
          error={
            new InputError(`No entrypoint specified`, {
              props: {
                details: `No entrypoint was specified and there is also no file resolvable at \`${this.bud.relPath(
                  `@src/index.js`,
                )}\`. Either specify an entrypoint or create a file at \`${this.bud.relPath(
                  `@src/index.js`,
                )}\`.`,
              },
            })
          }
        />,
      )
    }

    if (this.mode === `development`) {
      this.renderStatic(
        <Box flexDirection="column">
          <Text color="blue">Development server</Text>
          <Box flexDirection="row">
            <Text>URL:</Text>
            <Text>
              {this.bud.hooks
                .filter(`dev.url`, new URL(`http://0.0.0.0:3000`))
                .toString()}
            </Text>
          </Box>
          {this.bud.hooks
            .filter(`dev.middleware.enabled`)
            .includes(`proxy`) ? (
            <Box flexDirection="row">
              <Text>Proxy:</Text>
              <Text>
                {this.bud.hooks
                  .filter(
                    `dev.middleware.proxy.options.target`,
                    new URL(`http://0.0.0.0:8000`),
                  )
                  .toString()}
              </Text>
            </Box>
          ) : null}
          <Box flexDirection="column">
            <Text>Client scripts:</Text>
            {[...this.bud.hooks.filter(`dev.client.scripts`, new Set([]))]
              .map(fn => fn(this.bud))
              .map((script, key) => {
                return (
                  <Text key={key}>
                    {figures.triangleRightSmall} {script}
                  </Text>
                )
              })}
          </Box>
        </Box>,
      )
    }

    try {
      webpack.validate(this.configuration)

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

  @bind
  public formatDepCheck(
    [dependency, requestedVersion],
    key: number | string,
  ) {
    if (dependency.startsWith(`@roots`)) return null

    const renderMessage = (type: `dependencies` | `devDependencies`) => (
      <Text key={key}>
        <Text color="yellow">
          {figures.warning}
          {`  `}
          {dependency}
        </Text>
        {` `}is overridden in your project `{type}`. If you do not require
        a custom version of{` `}
        {dependency} you should remove it.
      </Text>
    )

    if (
      this.bud.context.manifest.devDependencies &&
      Object.keys(this.bud.context.manifest.devDependencies).includes(
        dependency,
      )
    ) {
      return renderMessage(`devDependencies`)
    }

    if (
      this.bud.context.manifest.dependencies &&
      Object.keys(this.bud.context.manifest.dependencies).includes(
        dependency,
      )
    ) {
      return renderMessage(`dependencies`)
    }

    return (
      <Text key={key}>
        <Text color="green">
          {figures.tick} {dependency}
        </Text>
        {` `}
        is managed by bud.js ({requestedVersion})
      </Text>
    )
  }

  public async ls(path: string) {
    const formatFilesArray = (files: Array<InspectTreeResult>) => {
      return files.map((file, id) => {
        return (
          <Box
            flexDirection={file.children ? `column` : `row`}
            key={`${file.name}-file`}
          >
            <Text>
              <Text dimColor>
                {file.children ? figures.ellipsis : figures.pointerSmall}
              </Text>
              {` `}
              {file.name}
            </Text>
            {file.children ? (
              <Box flexDirection="column" paddingLeft={2}>
                {formatFilesArray(file.children)}
              </Box>
            ) : null}
          </Box>
        )
      })
    }

    const files = await this.bud.fs.inspectTree(path)
    return files.children ? formatFilesArray(files.children) : null
  }

  public mapEntrypoints(
    entrypoints: Array<[string, webpack.EntryObject]>,
  ) {
    return entrypoints.map(([name, entry]) => {
      return (
        <Box flexDirection="column" key={`${name}-entry`}>
          <Text>{name}</Text>
          <Text dimColor>
            {prettyFormat(entry, {
              printBasicPrototype: false,
            })}
          </Text>
        </Box>
      )
    })
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
