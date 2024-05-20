import type {Context} from '@roots/bud-framework/context'

import {join} from 'node:path'
import {stderr, stdin, stdout} from 'node:process'

import args from '@roots/bud-framework/bootstrap/args'
import * as projectEnv from '@roots/bud-framework/bootstrap/env'
import * as projectFiles from '@roots/bud-framework/bootstrap/files'
import * as projectPaths from '@roots/bud-framework/bootstrap/paths'
import * as filesystem from '@roots/bud-support/filesystem'
import {render} from '@roots/bud-support/ink'
import logger from '@roots/bud-support/logger'
import whichPm from '@roots/bud-support/which-pm'

import * as budManifest from './bud.js'
import getExtensions from './extensions.js'
import services from './services.js'

export type Options = {
  extensions?: Array<string>
} & Omit<Partial<Context>, `extensions`>

let context: Context

export default async function make(
  options: Options = {},
): Promise<Context> {
  logger.scope(`bootstrap`).log(`🏗️`, `creating context`)

  const basedir = options?.basedir ?? process.cwd()
  const paths = projectPaths.get(basedir)

  const fs = filesystem.get(paths.basedir)
  const env = projectEnv.get(paths.basedir)
  const bud = await budManifest.get(fs)

  let manifest: Context[`manifest`]
  try {
    manifest = await fs.read(join(paths.basedir, `package.json`))
    if (manifest?.bud?.paths?.basedir) {
      const targetPath = join(basedir, manifest.bud.paths.basedir)
      logger
        .scope(`bootstrap`)
        .log(
          `🏗️`,
          `rebuilding context`,
          `based on bud.paths.basedir sourced from`,
          join(targetPath, `package.json`),
        )

      return await make({
        basedir: targetPath,
        ...(options ?? {}),
      })
    }
  } catch (e) {
    logger
      .scope(`bootstrap`)
      .warn(
        `📦`,
        `no package.json found at ${join(paths.basedir, `package.json`)}`,
      )
  }

  const files: Context[`files`] = await projectFiles.get(paths.basedir)
  const extensions: Context[`extensions`] = getExtensions(
    manifest,
    args.use ?? [],
    options?.extensions,
  )

  if (!options.pm) {
    const pm = await whichPm(basedir)
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
    render: options?.render ?? render,
    services: [...(services ?? []), ...(options?.services ?? [])],
    stderr: options?.stderr ?? stderr,
    stdin: options?.stdin ?? stdin,
    stdout: options?.stdout ?? stdout,
  }

  logger
    .unscope()
    .scope(context.label, `bootstrap`)
    .log(`🏗️`, `building`, context.label)
    .log(`📂`, `basedir`, context.basedir)
    .log(`😎`, `version`, context.bud.version)
    .log(`📦`, `package manager`, context.pm)
    .scope(context.label)

  return context
}

export type {Context}
