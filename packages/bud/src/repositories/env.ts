import {join} from 'path'
import dotenv from 'dotenv'
import {Loose} from '@roots/bud-typings'

const env = function (paths: Loose): Loose {
  return (
    dotenv.config({
      path: join(paths.get('project'), '.env'),
    }).parsed ?? {}
  )
}

export {env}
