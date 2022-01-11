import {factory as budFactory, Bud} from '@roots/bud'
import {join} from 'path'

export const repoPath = (path: string) => join(process.cwd(), path)

export const factory = async (options?: Bud.Options) => {
  const bud = await budFactory({
    config: {
      features: {
        dashboard: false,
        log: false,
      },
      location: {
        project: repoPath('tests/util/project'),
      },
      ...(options ?? {}),
    },
  })

  bud.setPath('location', repoPath('tests/util/project'))

  return bud
}

export {Bud} from '@roots/bud'
