/* eslint-disable no-console */
import {join} from 'node:path'

import type {CommandContext, Context} from '@roots/bud-framework/options'
import * as projectEnv from '@roots/bud-support/utilities/env'
import * as projectFiles from '@roots/bud-support/utilities/files'
import * as filesystem from '@roots/bud-support/utilities/filesystem'
import logger from '@roots/bud-support/utilities/logger'
import * as projectPaths from '@roots/bud-support/utilities/paths'

import * as budContext from './bud.js'
import getExtensions from './extensions.js'
import services from './services.js'

export default async (
  context: Partial<CommandContext>,
): Promise<Context> => {
  let manifest: Context[`manifest`]

  let paths = projectPaths.get(context?.basedir ?? process.cwd())
  let fs = filesystem.get(paths.basedir)

  let env: Context[`env`] = projectEnv.get(paths.basedir)
  let bud: Context[`bud`] = await budContext.get(fs)
  try {
    manifest = await fs.read(join(paths.basedir, `package.json`))
  } catch (e) {}
  let files: Context[`files`] = await projectFiles.get(paths.basedir)
  let extensions: Context[`extensions`] = getExtensions(manifest)

  const instance: Context = {
    ...(context ?? {}),
    label: context?.label ?? manifest?.name ?? bud?.label ?? `default`,
    // eslint-disable-next-line n/no-process-env
    bin: process.env.BUD_JS_BIN ?? `node`,
    basedir: paths.basedir,
    mode: context?.mode ?? `production`,
    env: {...(env ?? {}), ...(context?.env ?? {})},
    files: {...(files ?? {}), ...(context?.files ?? {})},
    services: [...(services ?? []), ...(context?.services ?? [])],
    bud: {...(bud ?? {}), ...(context?.bud ?? {})},
    manifest: {...(manifest ?? {}), ...(context?.manifest ?? {})},
    extensions: {
      builtIn: [
        ...(extensions?.builtIn ?? []),
        ...(context?.extensions?.builtIn ?? []),
      ],
      discovered: [
        ...(extensions?.discovered ?? []),
        ...(context?.extensions?.discovered ?? []),
      ],
    },
    logger: context?.logger ?? logger,
  } as Context

  instance.logger.unscope()
  instance.logger.log(`🏗️`, `building`, instance.label)
  instance.logger.log(`📂`, `basedir`, instance.basedir)
  instance.logger.log(`😎`, `version`, instance.bud.version)
  instance.logger.scope(instance.label)

  return instance
}
