import '@roots/bud-api'
import '@roots/bud-babel'

import {factory as budFactory} from '@roots/bud'
import {join} from 'path'

export const factory = async () => {
  return await budFactory({
    config: {
      features: {
        dashboard: false,
        log: false,
      },
      location: {
        project: join(process.cwd(), 'tests/util/project'),
      },
    },
  })
}

export {Bud} from '@roots/bud'
