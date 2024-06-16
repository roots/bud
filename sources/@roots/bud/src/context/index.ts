import type {Context} from '@roots/bud-framework/context'

import {join} from 'node:path'
import {stderr, stdin, stdout} from 'node:process'

import * as budManifest from '@roots/bud/context/bud'
import getExtensions from '@roots/bud/context/extensions'
import services from '@roots/bud/context/services'
import args from '@roots/bud-framework/bootstrap/args'
import * as projectEnv from '@roots/bud-framework/bootstrap/env'
import * as projectFiles from '@roots/bud-framework/bootstrap/files'
import * as projectPaths from '@roots/bud-framework/bootstrap/paths'
import * as filesystem from '@roots/bud-support/filesystem'
import logger from '@roots/bud-support/logger'
import whichPm from '@roots/bud-support/which-pm'

export type Options = {
  extensions?: Array<string>
} & Omit<Partial<Context>, `extensions`>

let context: Context

export default async function make(
  options: Options = {},
): Promise<Context> {
  logger.scope(`bootstrap`).log(`🏗️`, `Creating context`)

  const basedir = options?.basedir ?? process.cwd()
  const paths = projectPaths.get(basedir)

  const fs = filesystem.get(paths.basedir)
  const env = projectEnv.get(paths.basedir)
  const bud = await budManifest.get(fs)

  let manifest: Context[`manifest`]
  try {
    manifest = await fs.read(join(paths.basedir, `package.json`))
    if (manifest?.bud?.basedir) {
      const targetPath = join(paths.basedir, manifest.bud.basedir)
      logger
        .scope(`bootstrap`)
        .log(
          `🏗️`,
          `Directory changed`,
          `rebuilding context from`,
          join(targetPath, `package.json`),
        )

      return await make({
        basedir: targetPath,
        ...(options ?? {}),
      })
    }
  } catch (error) {
    logger.scope(`bootstrap`).warn(`📦`, error)
  }

  const files: Context[`files`] = await projectFiles.get(paths.basedir)
  const extensions: Context[`extensions`] = getExtensions(
    manifest,
    args.use ?? [],
    options?.extensions,
  )

  if (!options.pm) {
    const pm = await whichPm(paths.basedir)
    options.pm = pm !== false ? pm : `npm`
  }

  context = {
    ...(args ?? {}),
    ...options,
    basedir: paths.basedir,
    bin: (env.BUD_JS_BIN as Context[`bin`]) ?? `node`,
    bud: {...bud, ...(options?.bud ?? {})},
    env: {...(env ?? {}), ...(options?.env ?? {})},
    extensions,
    files: {...(files ?? {}), ...(options?.files ?? {})},
    label: options?.label ?? manifest?.name ?? bud?.label ?? `default`,
    manifest: {...(manifest ?? {}), ...(options?.manifest ?? {})},
    mode: options?.mode ?? `production`,
    paths: {...paths, ...(options?.paths ?? {})},
    pm: args?.pm ?? options?.pm ?? `npm`,
    services: [...(services ?? []), ...(options?.services ?? [])],
    stderr: options?.stderr ?? stderr,
    stdin: options?.stdin ?? stdin,
    stdout: options?.stdout ?? stdout,
  }

  logger
    .unscope()
    .scope(context.label, `bootstrap`)
    .log(`🏗️`, `Building`, context.label)
    .log(`📂`, `Directory:`, context.basedir)
    .log(`📁`, `Storage:`, context.paths.storage)
    .log(`😎`, `Version:`, context.bud.version)
    .log(`📦`, `Package Manager:`, context.pm)
    .scope(context.label)

  return context
}

export type {Context}
