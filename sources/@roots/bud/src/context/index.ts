/* eslint-disable no-console */
import args from '@roots/bud/context/args'
import bud from '@roots/bud/context/bud'
import * as projectFiles from '@roots/bud/context/config'
import getEnv from '@roots/bud/context/env'
import getExtensions from '@roots/bud/context/extensions'
import getManifest from '@roots/bud/context/manifest'
import services from '@roots/bud/context/services'
import type {Context} from '@roots/bud-framework/options'
import {Filesystem} from '@roots/bud-support/filesystem'
import Signale from '@roots/bud-support/signale'

import * as argv from './argv.js'

let contexts: Record<string, Context> = {}

export default async (
  {basedir, ...overrides}: Partial<Context>,
  cache = true,
): Promise<Context> => {
  if (cache && contexts[basedir]) return contexts[basedir]

  const fs = new Filesystem(basedir)

  let config: Context[`config`] | undefined
  let env: Context[`env`] | undefined
  let extensions: Context[`extensions`] | undefined
  let manifest: Context[`manifest`] | undefined

  if (!argv.flag(`no-find`)) {
    env = getEnv({basedir, ...overrides})
    config = await projectFiles.get({basedir, fs})
    manifest = getManifest(config)
    extensions = getExtensions(manifest)
  }

  const logLevel = argv.flag(`verbose`)
    ? `log`
    : argv.flag(`log`)
    ? `info`
    : `warn`

  const logger = new Signale({
    logLevel,
    disabled: argv.flag(`no-log`),
    scope: manifest?.label ?? bud?.label ?? `default`,
  })

  const context = {
    label: overrides?.label ?? manifest?.name ?? bud?.label,
    basedir,
    mode: overrides?.mode,
    env: {
      ...(env ?? {}),
      ...(overrides?.env ?? {}),
    },
    config: {
      ...(config ?? {}),
      ...(overrides?.config ?? {}),
    },
    args: {
      ...(args ?? {}),
      ...(overrides?.args ?? {}),
    },
    services: [...(services ?? []), ...(overrides?.services ?? [])],
    bud: {
      ...(bud ?? {}),
      ...(overrides?.bud ?? {}),
    },
    manifest: {
      ...(manifest ?? {}),
      ...(overrides?.manifest ?? {}),
    },
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

  if (context.args?.debug) console.dir(context)

  if (cache) {
    contexts[basedir] = context
    return contexts[basedir]
  }

  return context
}
