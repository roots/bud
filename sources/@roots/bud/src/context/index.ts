/* eslint-disable no-console */
import args from '@roots/bud/context/args'
import bud from '@roots/bud/context/bud'
import getConfig from '@roots/bud/context/config'
import getEnv from '@roots/bud/context/env'
import getExtensions from '@roots/bud/context/extensions'
import getManifest from '@roots/bud/context/manifest'
import services from '@roots/bud/context/services'
import type {Context} from '@roots/bud-framework/options'

export default async (basedir: string): Promise<Context> => {
  const config = await getConfig(basedir)

  const context = {
    basedir,
    env: getEnv(basedir),
    config,
    args,
    services,
    bud,
    manifest: null,
    extensions: null,
    label: null,
    mode: null,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
    colorDepth: 256,
  }

  context.manifest = getManifest(context.config)
  context.extensions = getExtensions(context.manifest)
  context.label = context.manifest.name ?? context.bud.label

  return context
}
