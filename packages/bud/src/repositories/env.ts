import type {Bud} from '..'
import type {RepositoryDefinition} from '../container'

import {join} from 'path'
import dotenv from 'dotenv'

const env: RepositoryDefinition = {
  name: 'env',
  boot: (bud: Bud): any =>
    dotenv.config({
      path: join(bud.paths.get('project'), '.env'),
    }).parsed ?? {},
}

export {env}
