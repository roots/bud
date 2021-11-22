import {base} from './base'
import {location} from './location'
import {log} from './log'
import {target} from './target'

export interface flags {
  help: typeof base.help
  version: typeof base.version
  ['location.project']?: location['location.project']
  ['location.src']?: location['location.src']
  ['location.dist']?: location['location.dist']
  ['location.publicPath']?: location['location.publicPath']
  ['location.storage']?: location['location.storage']
  ['location.modules']?: location['location.modules']
  ['log']?: log['log']
  ['log.level']?: log['log.level']
  ['log.papertrail']?: log['log.papertrail']
  ['log.secret']?: log['log.secret']
  ['target']?: target['target']
}

export const flags: flags = {
  ...base,
  ...location,
  ...log,
  ...target,
}

export {base, location, log, target}
