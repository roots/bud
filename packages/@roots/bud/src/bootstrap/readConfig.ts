import {merge} from 'lodash'
import {join} from 'path'
import {readJsonSync, existsSync} from 'fs-extra'
import {config} from '../config'

/**
 * readConfig
 *
 * Resolve/merge configuration from:
 *
 *  - package.json
 *  - bud.project.json
 *  - defaults
 *
 */
export function readConfig() {
  const pkgJson = join(process.cwd(), 'package.json')
  const pkg = existsSync(pkgJson) ? readJsonSync(pkgJson) : null

  const cfgFile = join(process.cwd(), 'project.json')
  const cfg = existsSync(cfgFile) ? readJsonSync(cfgFile) : null

  return cfg ? merge(config, pkg?.bud) : config
}
