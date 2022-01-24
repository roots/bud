import {Bud,factory as budFactory} from '@roots/bud'
import {join} from 'path'

export const repoPath = (path: string) =>
  join(process.cwd(), path)

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (
  options?: Bud.Options['config'],
) => {
  const bud = await budFactory({
    config: {
      features: {
        dashboard: false,
        log: false,
        ...(options?.features ?? {}),
      },
      location: {
        project: mockProject.path,
        ...(options?.location ?? {}),
      },
      ...(options ?? {}),
    },
  })

  bud.setPath('location', mockProject.path)

  return bud
}

export {Bud} from '@roots/bud'
