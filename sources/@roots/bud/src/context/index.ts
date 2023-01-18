/* eslint-disable no-console */
import * as argv from '@roots/bud/context/argv'
import bud from '@roots/bud/context/bud'
import * as projectFiles from '@roots/bud/context/config'
import getEnv from '@roots/bud/context/env'
import getExtensions from '@roots/bud/context/extensions'
import getManifest from '@roots/bud/context/manifest'
import services from '@roots/bud/context/services'
import type * as Factory from '@roots/bud/factory'
import {Logger} from '@roots/bud/logger'
import type {CommandContext, Context} from '@roots/bud-framework/options'
import {Filesystem} from '@roots/bud-support/filesystem'
import omit from '@roots/bud-support/lodash/omit'

let contexts: Record<string, Context> = {}

export default async (
  {basedir, ...overrides}: Partial<CommandContext>,
  options: Factory.Options = {
    cache: true,
    find: false,
  },
): Promise<Context> => {
  if (!basedir) basedir = argv.basedir
  if (options.cache && contexts[basedir]) return contexts[basedir]

  const fs = new Filesystem(basedir)

  let config: Context[`config`] | undefined
  let env: Context[`env`] | undefined
  let extensions: Context[`extensions`] | undefined
  let manifest: Context[`manifest`] | undefined

  if (options.find) {
    env = getEnv({basedir, ...overrides})
    config = await projectFiles.get({basedir, fs})
    manifest = getManifest(config)
  }

  extensions = getExtensions(manifest, options.find)

  const logger = new Logger()

  const context: Context = {
    label: overrides?.label ?? manifest?.name ?? bud?.label ?? `default`,
    basedir,
    // eslint-disable-next-line n/no-process-env
    bin: process.env.BUD_JS_BIN ?? `node`,
    ...overrides,
    mode: overrides?.mode ?? `production`,
    env: {...(env ?? {}), ...(overrides?.env ?? {})},
    config: {...(config ?? {}), ...(overrides?.config ?? {})},
    services: [...(services ?? []), ...(overrides?.services ?? [])],
    bud: {...(bud ?? {}), ...(overrides?.bud ?? {})},
    manifest: {...(manifest ?? {}), ...(overrides?.manifest ?? {})},
    extensions: {
      builtIn: [
        ...(extensions?.builtIn ?? []),
        ...(overrides?.extensions?.builtIn ?? []),
      ],
      discovered: [
        ...(extensions?.discovered ?? []),
        ...(overrides?.extensions?.discovered ?? []),
      ],
    },
    logger: overrides?.logger ?? logger,
  }

  context.logger.scope(context.label).debug(omit(context, `env`))
  await context.logger.setCommonPath(context.basedir)

  if (options.cache) {
    contexts[basedir] = context
    return contexts[basedir]
  }

  return context
}
