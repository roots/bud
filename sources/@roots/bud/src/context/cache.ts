import config from 'conf'
import {sep} from 'node:path/posix'

export default (basedir: string) =>
  new config({
    configName: `bud-${basedir.replace(sep, `.`)}`,
  })
