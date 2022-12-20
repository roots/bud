/* eslint-disable no-console */
import bud from '@roots/bud/context/bud'
import * as projectFiles from '@roots/bud/context/config'
import getEnv from '@roots/bud/context/env'
import getExtensions from '@roots/bud/context/extensions'
import getManifest from '@roots/bud/context/manifest'
import services from '@roots/bud/context/services'
import {Logger} from '@roots/bud/logger'
import type {Context} from '@roots/bud-framework/options'
import {Filesystem} from '@roots/bud-support/filesystem'
import {omit} from '@roots/bud-support/lodash-es'

import * as argv from './argv.js'

let contexts: Record<string, Context> = {}

export default async (
  {basedir, ...overrides}: Partial<Context>,
  cache = true,
): Promise<Context> => {
  if (cache && contexts[basedir]) return contexts[basedir]

  const fs = new Filesystem(basedir)

  let args: Context[`args`] | undefined
  let config: Context[`config`] | undefined
  let env: Context[`env`] | undefined
  let extensions: Context[`extensions`] | undefined
  let manifest: Context[`manifest`] | undefined

  if (!argv.has(`no-find`)) {
    env = getEnv({basedir, ...overrides})
    config = await projectFiles.get({basedir, fs})
    manifest = getManifest(config)
    extensions = getExtensions(manifest)
  }

  const logger = new Logger()

  const context: Context = {
    label: overrides?.label ?? manifest?.name ?? bud?.label ?? `default`,
    basedir,
    ...overrides,
    mode: overrides?.mode ?? `production`,
    args: {...(args ?? {}), ...(overrides?.args ?? {})},
    env: {...(env ?? {}), ...(overrides?.env ?? {})},
    config: {...(config ?? {}), ...(overrides?.config ?? {})},
    services: [...(services ?? []), ...(overrides?.services ?? [])],
    bud: {...(bud ?? {}), ...(overrides?.bud ?? {})},
    manifest: {...(manifest ?? {}), ...(overrides?.manifest ?? {})},
    extensions: {
      builtIn: [
        ...(extensions.builtIn ?? []),
        ...(overrides?.extensions?.builtIn ?? []),
      ],
      discovered: [
        ...(extensions.discovered ?? []),
        ...(overrides?.extensions?.discovered ?? []),
      ],
    },
    logger: overrides?.logger ?? logger,
  }

  context.logger.scope(context.label).debug(omit(context, `env`))
  await context.logger.setCommonPath(context.basedir)

  if (cache) {
    contexts[basedir] = context
    return contexts[basedir]
  }

  return context
}
