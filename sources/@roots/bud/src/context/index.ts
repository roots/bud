/* eslint-disable no-console */
import {isAbsolute, resolve} from 'node:path'

import type {Context} from '@roots/bud-framework/options'

import args from './args.js'
import bud from './bud.js'
import getConfig from './config.js'
import getEnv from './env.js'
import getExtensions from './extensions.js'
import getManifest from './manifest.js'
import services from './services.js'

export default async (basedir: string): Promise<Context> => {
  basedir = isAbsolute(basedir) ? basedir : resolve(process.cwd(), basedir)
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
