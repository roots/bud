/* eslint-disable no-console */
import args from '@roots/bud/context/args'
import bud from '@roots/bud/context/bud'
import getConfig from '@roots/bud/context/config'
import getEnv from '@roots/bud/context/env'
import getExtensions from '@roots/bud/context/extensions'
import getManifest from '@roots/bud/context/manifest'
import services from '@roots/bud/context/services'
import type {Context} from '@roots/bud-framework/options'

let cache: Record<string, Context> = {}

export default async (
  basedir: string = args.basedir,
  find: boolean = false,
): Promise<Context> => {
  if (cache[basedir]) return cache[basedir]

  let config: Context['config']
  let manifest: Context['manifest']
  let extensions: Context['extensions']
  let env: Context['env']

  if (find) {
    config = await getConfig(basedir)
    manifest = getManifest(config)
  }

  env = getEnv(basedir)
  extensions = getExtensions(manifest)

  cache[basedir] = {
    basedir,
    env,
    config,
    args,
    services,
    bud,
    manifest,
    extensions,
    mode: null,
    label: manifest?.name ?? bud.label,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
    colorDepth: 256,
  }

  return cache[basedir]
}
