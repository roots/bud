/* eslint-disable no-console */
import {join} from 'node:path'

import type {Context} from '@roots/bud-framework/options'
import args from '@roots/bud-support/utilities/args'
import * as projectEnv from '@roots/bud-support/utilities/env'
import * as projectFiles from '@roots/bud-support/utilities/files'
import * as filesystem from '@roots/bud-support/utilities/filesystem'
import logger from '@roots/bud-support/utilities/logger'
import * as projectPaths from '@roots/bud-support/utilities/paths'

import * as budManifest from './bud.js'
import getExtensions from './extensions.js'
import services from './services.js'

export default async (
  options: Partial<Context> = {},
): Promise<Context> => {
  let basedir = options?.basedir ?? process.cwd()
  const paths = projectPaths.get(basedir)
  if (paths.basedir !== basedir) basedir = paths.basedir

  const fs = filesystem.get(basedir)
  const env = projectEnv.get(basedir)
  const bud = await budManifest.get(fs)

  let manifest: Context[`manifest`]
  try {
    manifest = await fs.read(join(basedir, `package.json`))
  } catch (e) {
    logger.scope(`bootstrap`).warn(`📦`, `no package.json found`)
  }

  const files: Context[`files`] = await projectFiles.get(basedir)
  const extensions: Context[`extensions`] = getExtensions(manifest)

  Object.entries(files).map(([k, v]) =>
    logger.scope(`bootstrap`).info(`file`, k, v),
  )

  const context: Context = {
    ...(args ?? {}),
    ...options,
    basedir,
    bin: (env.BUD_JS_BIN as Context[`bin`]) ?? `node`,
    label: options?.label ?? manifest?.name ?? bud?.label ?? `default`,
    mode: options?.mode ?? `production`,
    env: {...(env ?? {}), ...(options?.env ?? {})},
    files: {...(files ?? {}), ...(options?.files ?? {})},
    paths: {...paths, ...(options?.paths ?? {})},
    services: [...(services ?? []), ...(options?.services ?? [])],
    bud: {...bud, ...(options?.bud ?? {})},
    manifest: {...(manifest ?? {}), ...(options?.manifest ?? {})},
    extensions: {
      builtIn: [
        ...(extensions?.builtIn ?? []),
        ...(options?.extensions?.builtIn ?? []),
      ],
      discovered: [
        ...(extensions?.discovered ?? []),
        ...(options?.extensions?.discovered ?? []),
      ],
    },
  }

  logger
    .unscope()
    .scope(`bootstrap`)
    .log(`🏗️`, `building`, context.label)
    .scope(`bootstrap`)
    .log(`📂`, `basedir`, context.basedir)
    .scope(`bootstrap`)
    .log(`😎`, `version`, context.bud.version)
    .scope(context.label)

  return context
}

export type {Context}
