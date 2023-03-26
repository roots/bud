/* eslint-disable react/no-unescaped-entities */
import BudCommand from '@roots/bud/cli/commands/bud'
import {Error} from '@roots/bud-dashboard/app'
import type {Extension} from '@roots/bud-framework'
import type {CommandContext} from '@roots/bud-framework/options'
import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {BudError, InputError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import prettyFormat from '@roots/bud-support/pretty-format'
import webpack from '@roots/bud-support/webpack'
import type {InspectTreeResult} from 'fs-jetpack/types.js'
import * as Ink from 'ink'

import {WinError} from '../../components/WinError.js'
import {dry} from '../../decorators/command.dry.js'
import {isWindows} from '../../helpers/isWindows.js'

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
  public override withArguments = async (args: CommandContext[`args`]) => {
    return {...args, cache: false, dry: true}
  }

  public configuration: webpack.Configuration
  public enabledExtensions: Array<[string, Extension]> = []
  public disabledExtensions: Array<[string, Extension]> = []
  public entrypoints: Array<[string, webpack.EntryObject]> = []
  public resolvedDependencies: Record<string, string> = {}
  public makeTimer = () => {
    const start = process.hrtime()
    return () => {
      const end = process.hrtime(start)
      return this.seconds(end)
    }
  }
  public seconds(hrTime: [number, number]) {
    return (hrTime[0] + hrTime[1] / 1e9).toFixed(2)
  }
  public timings: Record<string, string> = {}

  /**
   * Execute command
   */
  public override async execute() {
    const {Doctor} = await import(`./Doctor.js`)

    const buildTimer = this.makeTimer()
    await this.makeBud(this)
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
        <Ink.Box flexDirection="column">
          <Ink.Text color="yellow">
            {figures.info} Detected compilation cache
          </Ink.Text>
          <Ink.Spacer />
          <Ink.Text>
            If you are experiencing issues with bud.js you should start by
            clearing the cache.{`\n`}
          </Ink.Text>
          <Ink.Text>
            {figures.triangleRightSmall} To delete this directory with the
            CLI run{` `}
            <Ink.Text color="green">`bud clean`</Ink.Text>, or;
          </Ink.Text>
          <Ink.Text>
            {figures.triangleRightSmall} Use the{` `}
            <Ink.Text color="green">`--force`</Ink.Text> flag on your next
            build
          </Ink.Text>
        </Ink.Box>,
      )
    }

    if (this.bud.hasChildren) {
      this.renderStatic(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Child compilers{`\n`}</Ink.Text>
          {Object.values(this.bud.children).map((child, i) => (
            <Ink.Box key={i} flexDirection="row">
              <Ink.Text>{figures.triangleRightSmall}</Ink.Text>
              <Ink.Text>{` `}</Ink.Text>
              <Ink.Text>{child.label}</Ink.Text>
            </Ink.Box>
          ))}
          <Ink.Text>{` `}</Ink.Text>
          <Ink.Text>
            Note that not all `bud doctor` checks are not currently
            compatible with multi-compiler builds.
          </Ink.Text>
        </Ink.Box>,
      )
    }

    this.renderStatic(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">Project paths</Ink.Text>
        <Ink.Text>{` `}</Ink.Text>
        <Ink.Text>project: {this.bud.path()}</Ink.Text>
        <Ink.Text>
          input:{` `}
          {this.bud.path(`@src`).replace(this.bud.path(), `@project`)}
        </Ink.Text>
        <Ink.Text>
          output:{` `}
          {this.bud.path(`@dist`).replace(this.bud.path(), `@project`)}
        </Ink.Text>
        <Ink.Text>
          storage:{` `}
          {this.bud.path(`@storage`).replace(this.bud.path(), `@project`)}
        </Ink.Text>
        <Ink.Text>
          cache: {` `}
          @project/{this.bud.relPath(this.bud.cache.cacheDirectory)}
        </Ink.Text>
      </Ink.Box>,
    )

    this.renderStatic(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">
          Checking versions of core packages
        </Ink.Text>
        <Ink.Text>{` `}</Ink.Text>
        {await this.packageCheck(`@roots/bud-api`)}
        {await this.packageCheck(`@roots/bud-build`)}
        {await this.packageCheck(`@roots/bud-cache`)}
        {await this.packageCheck(`@roots/bud-dashboard`)}
        {await this.packageCheck(`@roots/bud-extensions`)}
        {await this.packageCheck(`@roots/bud-framework`)}
        {await this.packageCheck(`@roots/bud-hooks`)}
        {await this.packageCheck(`@roots/bud-server`)}
        {await this.packageCheck(`@roots/bud-support`)}
      </Ink.Box>,
    )

    const check =
      (top = false) =>
      async ([signifier, version]) => {
        if (!top) {
          this.resolvedDependencies[signifier] = version
        }

        try {
          const path = await this.bud.module.getManifestPath(signifier)
          if (!path) return

          const manifest = await this.bud.fs.json.read(path)
          if (!manifest.dependencies) return

          Object.entries(manifest.dependencies).forEach(
            ([signifier, version]: [string, string]) => {
              this.resolvedDependencies[signifier] = version
            },
          )

          await Promise.all(
            Object.entries(manifest.dependencies)
              .filter(([signifier]) => signifier.startsWith(`@roots`))
              .flatMap(check()),
          )
        } catch (e) {}
      }

    try {
      await Promise.all(
        [
          ...(this.bud.context.manifest?.dependencies
            ? Object.entries(this.bud.context.manifest.dependencies)
            : []),
          ...(this.bud.context.manifest?.devDependencies
            ? Object.entries(this.bud.context.manifest.devDependencies)
            : []),
        ]
          .filter(Boolean)
          .filter(([signifier]) => signifier.startsWith(`@roots`))
          .map(check(true)),
      )
    } catch (e) {}

    this.renderStatic(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">
          Checking installed package compatibility{`\n`}
        </Ink.Text>
        {Object.entries(this.resolvedDependencies).map(
          this.formatDepCheck,
        )}
      </Ink.Box>,
    )

    this.renderStatic(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">Mode</Ink.Text>
        <Ink.Text>{this.bud.mode}</Ink.Text>
      </Ink.Box>,
    )

    const configFiles = (
      this.bud.context.files ? Object.values(this.bud.context.files) : []
    ).filter(({bud}) => bud)
    if (configFiles.length) {
      this.renderStatic(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Bud configuration files{`\n`}</Ink.Text>
          {configFiles.map(({name, path}, i) => (
            <Ink.Box key={i}>
              <Ink.Text>
                {figures.triangleRightSmall} {name}
              </Ink.Text>
              <Ink.Text>{` `}</Ink.Text>
              <Ink.Text dimColor>
                {path.replace(this.bud.context.basedir, `.`)}
              </Ink.Text>
            </Ink.Box>
          ))}
        </Ink.Box>,
      )
    } else {
      this.renderStatic(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Registered configurations{`\n`}</Ink.Text>
          <Ink.Text dimColor>
            No configuration files found in project
          </Ink.Text>
        </Ink.Box>,
      )
    }

    try {
      this.renderStatic(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Config API calls{`\n`}</Ink.Text>
          <Ink.Text></Ink.Text>
          {!this.bud.api.trace.length ? (
            <Ink.Text dimColor>No config calls logged</Ink.Text>
          ) : (
            this.bud.api.trace.map(([fn, args], i) => (
              <Ink.Box flexDirection="row" key={i}>
                <Ink.Text>
                  {figures.triangleRightSmall} {fn}
                </Ink.Text>
                <Ink.Text>{` `}</Ink.Text>
                <Ink.Text dimColor>
                  {args.map(this.bud.fs.json.stringify).join(`, `)}
                </Ink.Text>
              </Ink.Box>
            ))
          )}
        </Ink.Box>,
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
          <Ink.Box flexDirection="column">
            <Ink.Text color="blue">Environment{`\n`}</Ink.Text>
            {this.bud.env.getEntries().map(([key, value]) => {
              return (
                <Ink.Box key={key} flexDirection="row">
                  <Ink.Text>{figures.triangleRightSmall}</Ink.Text>
                  <Ink.Text>{` `}</Ink.Text>
                  <Ink.Text>{key}</Ink.Text>
                  <Ink.Text>{` `}</Ink.Text>
                  <Ink.Text dimColor>
                    {typeof value === `string` && value.length > 0
                      ? `************`
                      : typeof value}
                  </Ink.Text>
                </Ink.Box>
              )
            })}
          </Ink.Box>,
        )
      } catch (error) {
        this.renderStatic(<Error error={BudError.normalize(error)} />)
      }
    }

    if (this.enabledExtensions) {
      try {
        this.renderStatic(
          <Ink.Box flexDirection="column">
            <Ink.Text color="blue">Enabled extensions{`\n`}</Ink.Text>
            {this.mapExtensions(this.enabledExtensions)}
          </Ink.Box>,
        )
        this.renderStatic(
          <Ink.Box flexDirection="column">
            <Ink.Text color="blue">Disabled extensions{`\n`}</Ink.Text>
            {this.mapExtensions(this.disabledExtensions)}
          </Ink.Box>,
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
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Development server</Ink.Text>
          <Ink.Box flexDirection="row">
            <Ink.Text>URL:</Ink.Text>
            <Ink.Text>
              {this.bud.hooks
                .filter(`dev.url`, new URL(`http://0.0.0.0:3000`))
                .toString()}
            </Ink.Text>
          </Ink.Box>
          {this.bud.hooks
            .filter(`dev.middleware.enabled`)
            .includes(`proxy`) ? (
            <Ink.Box flexDirection="row">
              <Ink.Text>Proxy:</Ink.Text>
              <Ink.Text>
                {this.bud.hooks
                  .filter(
                    `dev.middleware.proxy.options.target`,
                    new URL(`http://0.0.0.0:8000`),
                  )
                  .toString()}
              </Ink.Text>
            </Ink.Box>
          ) : null}
          <Ink.Box flexDirection="column">
            <Ink.Text>Client scripts:</Ink.Text>
            {[...this.bud.hooks.filter(`dev.client.scripts`, new Set([]))]
              .map(fn => fn(this.bud))
              .map((script, key) => {
                return (
                  <Ink.Text key={key}>
                    {figures.triangleRightSmall} {script}
                  </Ink.Text>
                )
              })}
          </Ink.Box>
        </Ink.Box>,
      )
    }

    try {
      webpack.validate(this.configuration)

      this.renderStatic(
        <Ink.Box>
          <Ink.Text color="green">
            {figures.tick} webpack validated configuration
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      this.renderStatic(
        <Ink.Box>
          <Ink.Text color="red">❌ {error?.message ?? error}</Ink.Text>
        </Ink.Box>,
      )
    }
  }

  public mapExtensions(extensions: Array<[string, Extension]>) {
    return extensions.map(([name, extension]) => (
      <Ink.Box key={`extension-${name}`} flexDirection="column">
        <Ink.Text color="white">
          {figures.triangleRightSmall} {name}
        </Ink.Text>
      </Ink.Box>
    ))
  }

  public mapEntrypoints(
    entrypoints: Array<[string, webpack.EntryObject]>,
  ) {
    return entrypoints.map(([name, entry]) => {
      return (
        <Ink.Box key={`${name}-entry`} flexDirection="column">
          <Ink.Text>{name}</Ink.Text>
          <Ink.Text dimColor>
            {prettyFormat(entry, {
              printBasicPrototype: false,
            })}
          </Ink.Text>
        </Ink.Box>
      )
    })
  }

  public async ls(path: string) {
    const formatFilesArray = (files: Array<InspectTreeResult>) => {
      return files.map((file, id) => {
        return (
          <Ink.Box
            key={`${file.name}-file`}
            flexDirection={file.children ? `column` : `row`}
          >
            <Ink.Text>
              <Ink.Text dimColor>
                {file.children ? figures.ellipsis : figures.pointerSmall}
              </Ink.Text>
              {` `}
              {file.name}
            </Ink.Text>
            {file.children ? (
              <Ink.Box paddingLeft={2} flexDirection="column">
                {formatFilesArray(file.children)}
              </Ink.Box>
            ) : null}
          </Ink.Box>
        )
      })
    }

    const files = await this.bud.fs.inspectTree(path)
    return files.children ? formatFilesArray(files.children) : null
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
        <Ink.Text>
          <Ink.Text color="green">
            {figures.tick} {signifier} meets requirements
          </Ink.Text>
          {` `}
          (required:{` `}
          {this.bud.context.bud.version}, installed: {packageVersion})
        </Ink.Text>
      )
    }
  }

  @bind
  public formatDepCheck(
    [dependency, requestedVersion],
    key: string | number,
  ) {
    if (dependency.startsWith(`@roots`)) return null

    const renderMessage = (type: `dependencies` | `devDependencies`) => (
      <Ink.Text key={key}>
        <Ink.Text color="yellow">
          {figures.warning}
          {`  `}
          {dependency}
        </Ink.Text>
        {` `}is overridden in your project `{type}`. If you do not require
        a custom version of{` `}
        {dependency} you should remove it.
      </Ink.Text>
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
      <Ink.Text key={key}>
        <Ink.Text color="green">
          {figures.tick} {dependency}
        </Ink.Text>
        {` `}
        is managed by bud.js ({requestedVersion})
      </Ink.Text>
    )
  }
}
