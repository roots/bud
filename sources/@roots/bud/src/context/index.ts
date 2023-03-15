/* eslint-disable no-console */
import * as argv from '@roots/bud/context/argv'
import bud from '@roots/bud/context/bud'
import * as projectFiles from '@roots/bud/context/config'
import getEnv from '@roots/bud/context/env'
import getExtensions from '@roots/bud/context/extensions'
import getManifest from '@roots/bud/context/manifest'
import services from '@roots/bud/context/services'
import {Logger} from '@roots/bud/logger'
import type {CommandContext, Context} from '@roots/bud-framework/options'
import {Filesystem} from '@roots/bud-support/filesystem'
import omit from '@roots/bud-support/lodash/omit'

export default async (
  context: Partial<CommandContext>,
): Promise<Context> => {
  if (!context.basedir) context.basedir = argv.basedir

  const fs = new Filesystem(context.basedir)

  let config = await projectFiles.get({basedir: context.basedir, fs})
  let env = getEnv(context.basedir)
  let manifest = getManifest(config)
  let extensions = getExtensions(manifest)

  const logger = new Logger()

  const instanceContext: Context = {
    label: context?.label ?? manifest?.name ?? bud?.label ?? `default`,
    basedir: context.basedir,
    // eslint-disable-next-line n/no-process-env
    bin: process.env.BUD_JS_BIN ?? `node`,
    ...context,
    mode: context?.mode ?? `production`,
    env: {...(env ?? {}), ...(context?.env ?? {})},
    config: {...(config ?? {}), ...(context?.config ?? {})},
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
  }

  instanceContext.logger
    .scope(instanceContext.label)
    .log(`🏗️  Building ${instanceContext.label}`)
    .debug(omit(instanceContext, `env`))

  return instanceContext
}
