import {factory as budFactory} from '@roots/bud'
import {join} from 'path'

export const factory = async () => {
  const bud = await budFactory({
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

  bud.setPath(
    'location',
    join(process.cwd(), 'tests/util/project'),
  )

  return bud
}

export {Bud} from '@roots/bud'
