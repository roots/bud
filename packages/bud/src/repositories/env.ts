import {join} from 'path'
import dotenv from 'dotenv'
import type {Bud} from '..'

const env = {
  repository: 'env',
  contents: (bud: Bud): any =>
    dotenv.config({
      path: join(bud.paths.get('project'), '.env'),
    }).parsed ?? {},
}

export {env}
