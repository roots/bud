import type {RepositoryDefinition} from '@roots/bud-types'

import {join} from 'path'
import dotenv from 'dotenv'

const env: RepositoryDefinition = {
  name: 'env',
  register:
    dotenv.config({
      path: join(process.cwd(), '.env'),
    }).parsed ?? {},
}

export {env}
