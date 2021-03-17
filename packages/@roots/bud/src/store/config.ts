import {merge} from 'lodash'
import {join} from 'path'
import {readJsonSync, existsSync} from 'fs-extra'
import {config} from './config.default'

/**
 * Configuration
 */
export function configure() {
  const pkgJson = join(process.cwd(), 'package.json')
  const pkg = existsSync(pkgJson) ? readJsonSync(pkgJson) : null

  const cfgFile = join(process.cwd(), 'bud.project.json')
  const cfgExists = existsSync(cfgFile)

  return cfgExists
    ? readJsonSync(cfgFile)
    : merge(config, pkg?.bud) ?? config
}
