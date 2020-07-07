/**
 * Bud - Asset Management Framework
 */
export type bud = {
  configs: configs
  features: features
  inProduction: inProduction
  mode: mode
  options: options
  paths: paths
  alias: alias
  auto: auto
  babel: babel
  bundle: bundle
  copy: copy
  copyAll: copyAll
  dependencyManifest: dependencyManifest
  dist: dist
  distPath: distPath
  hash: hash
  hot: hot
  inlineManifest: ({
    enabled,
    name,
  }: {
    enabled: boolean
    name: string
  }) => typeof import('.')
  postCss: postCss
  preset: preset
  project: project
  purge: purge
  src: src
  srcPath: srcPath
  sync: sync
  translate: translate
}
import {configs} from './base/configs'
import {features} from './base/features'
import {inProduction} from './base/mode'
import {mode} from './base/mode'
import {options} from './base/options'
import {paths} from './base/paths'
import {alias} from './api/alias'
import {auto} from './api/auto'
import {babel} from './api/babel'
import {bundle} from './api/bundle'
import {copy} from './api/copy'
import {copyAll} from './api/copyAll'
import {dependencyManifest} from './api/dependencyManifest'
import {dist} from './api/dist'
import {distPath} from './api/distPath'
import {hash} from './api/hash'
import {hot} from './api/hot'
declare namespace ___Users_kellymears_code_projects_cli_bud_bud_support_src_budpack_builder_index_ {}
import {postCss} from './api/postcss'
import {preset} from './api/preset'
import {project} from './api/project'
import {purge} from './api/purge'
import {src} from './api/src'
import {srcPath} from './api/srcPath'
import {sync} from './api/sync'
import {translate} from './api/translate'
export {}
//# sourceMappingURL=index.d.ts.map
