import {join} from 'path'
import dotenv from 'dotenv'

const env = function (paths: any) {
  return (
    dotenv.config({
      path: join(paths.get('project'), '.env'),
    }).parsed ?? {}
  )
}

export {env}
