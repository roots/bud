import BudCommand from '@roots/bud/cli/commands/bud'
import type {Extension} from '@roots/bud-framework'
import type {CommandContext} from '@roots/bud-framework/options'
import {Command} from '@roots/bud-support/clipanion'
import figures from '@roots/bud-support/figures'
import Ink from '@roots/bud-support/ink'
import prettyFormat from '@roots/bud-support/pretty-format'
import React from '@roots/bud-support/react'
import webpack from '@roots/bud-support/webpack'
import type {InspectTreeResult} from 'fs-jetpack/types.js'

import {Error} from '../components/Error.js'
import {dry} from '../decorators/command.dry.js'

/**
 * `bud doctor` command
 *
 * @public
 * @decorator `@dry`
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

  /**
   * Execute command
   *
   * @public
   * @decorator `@bind`
   */
  public override async execute() {
    await this.makeBud(this)
    await this.run(this)

    await this.renderOnce(
      <Ink.Box marginTop={1}>
        <Ink.Text color="magenta">
          {this.bud.context.manifest.name
            ? this.bud.context.manifest.name
            : this.bud.path()}
        </Ink.Text>
      </Ink.Box>,
    )

    await this.renderOnce(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">Core modules</Ink.Text>
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

    await this.renderOnce(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">Paths</Ink.Text>
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

    if (await this.bud.fs.exists(this.bud.cache.cacheDirectory)) {
      await this.renderOnce(
        <Ink.Box flexDirection="column">
          <Ink.Text color="yellow">
            Detected compilation cache:{` `}
            {this.bud.relPath(this.bud.cache.cacheDirectory)}
          </Ink.Text>

          <Ink.Text>
            If you are experiencing issues with bud.js you may want to
            delete this directory and try again.
          </Ink.Text>
          <Ink.Text>
            To delete this directory with the CLI run{` `}
            <Ink.Text color="green">`bud clean`</Ink.Text>
          </Ink.Text>
          <Ink.Text>
            Or, use the <Ink.Text color="green">`--force`</Ink.Text> flag
            on your next build
          </Ink.Text>
        </Ink.Box>,
      )
    }

    await this.renderOnce(
      <Ink.Box flexDirection="column">
        <Ink.Text color="blue">Mode</Ink.Text>
        <Ink.Text>{this.bud.mode}</Ink.Text>
      </Ink.Box>,
    )

    const configFiles = (
      this.bud.context.config ? Object.values(this.bud.context.config) : []
    ).filter(({bud}) => bud)
    if (configFiles.length) {
      await this.renderOnce(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Bud configuration files</Ink.Text>
          {configFiles.map(({name, path}, i) => (
            <Ink.Box key={i}>
              <Ink.Text>- {name}</Ink.Text>
              <Ink.Text>{` `}</Ink.Text>
              <Ink.Text dimColor>
                {path.replace(this.bud.context.basedir, `.`)}
              </Ink.Text>
            </Ink.Box>
          ))}
        </Ink.Box>,
      )
    } else {
      await this.renderOnce(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Registered configurations</Ink.Text>
          <Ink.Text dimColor>
            No configuration files found in project
          </Ink.Text>
        </Ink.Box>,
      )
    }

    try {
      await this.renderOnce(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Config API calls</Ink.Text>
          {!this.bud.api.trace.length ? (
            <Ink.Text dimColor>No config calls logged</Ink.Text>
          ) : (
            this.bud.api.trace.map(([fn, args], i) => (
              <Ink.Box flexDirection="row" key={i}>
                <Ink.Text>- {fn}</Ink.Text>
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
      await this.renderOnce(
        <Error
          label="Error analyzing called functions"
          message={error.message ?? error}
        />,
      )
    }

    try {
      this.configuration = await this.bud.build.make()
      this.entrypoints = this.configuration.entry
        ? Object.entries(this.configuration.entry)
        : []

      await Promise.all(
        Object.entries(this.bud.extensions.repository).map(
          async ([name, extension]: [string, Extension]) => {
            if (await extension.isEnabled()) {
              return this.enabledExtensions.push([name, extension])
            }
            return this.disabledExtensions.push([name, extension])
          },
        ),
      )
    } catch (error) {
      await this.renderOnce(
        <Error
          label={error.name ?? `Configuration error`}
          message={error.message ?? error}
        />,
      )
    }

    if (this.bud.env) {
      try {
        await this.renderOnce(
          <Ink.Box flexDirection="column">
            <Ink.Text color="blue">Environment</Ink.Text>
            {this.bud.env.getEntries().map(([key, value]) => {
              return (
                <Ink.Box key={key} flexDirection="row">
                  <Ink.Text>{key}</Ink.Text>
                  <Ink.Text>{` `}</Ink.Text>
                  <Ink.Text dimColor>
                    {typeof value === `string`
                      ? `************`
                      : typeof value}
                  </Ink.Text>
                </Ink.Box>
              )
            })}
          </Ink.Box>,
        )
      } catch (error) {
        await this.renderOnce(
          <Error label="Environment error" message={error.message} />,
        )
      }
    }

    if (this.enabledExtensions) {
      try {
        await this.renderOnce(
          <Ink.Box flexDirection="column">
            <Ink.Text color="blue">Enabled extensions</Ink.Text>
            {this.mapExtensions(this.enabledExtensions)}
          </Ink.Box>,
        )
        await this.renderOnce(
          <Ink.Box flexDirection="column">
            <Ink.Text color="blue">Disabled extensions</Ink.Text>
            {this.mapExtensions(this.disabledExtensions)}
          </Ink.Box>,
        )
      } catch (error) {
        await this.renderOnce(
          <Error label="Extensions" message={error.message ?? error} />,
        )
      }
    }

    if (this.entrypoints) {
      await this.renderOnce(
        <Ink.Box flexDirection="column">
          <Ink.Text color="blue">Entrypoints</Ink.Text>
          {this.mapEntrypoints(this.entrypoints)}
        </Ink.Box>,
      )
    }

    if (
      this.entrypoints.length === 1 &&
      this.entrypoints[0][0] === `main` &&
      this.entrypoints[0][1].import[0] === `index` &&
      !(await this.bud.fs.exists(this.bud.path(`@src/index.js`)))
    ) {
      await this.renderOnce(
        <Error
          label="Can't resolve application entrypoint"
          message={`No entrypoint was specified and there is also no file resolvable at \`${this.bud.relPath(
            `@src/index.js`,
          )}\`. Either specify an entrypoint or create a file at \`${this.bud.relPath(
            `@src/index.js`,
          )}\`.`}
        />,
      )
    }

    if (this.mode === `development`) {
      await this.renderOnce(
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
                return <Ink.Text key={key}>- {script}</Ink.Text>
              })}
          </Ink.Box>
        </Ink.Box>,
      )
    }

    try {
      webpack.validate(this.configuration)

      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="green">
            ✅ webpack validated configuration
          </Ink.Text>
        </Ink.Box>,
      )
    } catch (error) {
      await this.renderOnce(
        <Ink.Box>
          <Ink.Text color="red">❌ {error?.message ?? error}</Ink.Text>
        </Ink.Box>,
      )
    }
  }

  public mapExtensions(extensions: Array<[string, Extension]>) {
    return extensions.map(([name, extension]) => (
      <Ink.Box key={`extension-${name}`} flexDirection="column">
        <Ink.Text color="white">- {name}</Ink.Text>
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
          label={signifier}
          message={`${signifier} is not installed at the same version as @roots/bud (required: ${this.bud.context.bud.version}, installed: ${packageVersion}). Your installation may be corrupted; consider reinstalling with the \`--force\` flag.`}
        />
      )
    } else {
      return (
        <Ink.Text>
          <Ink.Text color="green">{signifier} meets requirements</Ink.Text>{` `}
          (required:{` `}
          {this.bud.context.bud.version}, installed: {packageVersion})
        </Ink.Text>
      )
    }
  }
}
