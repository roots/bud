import {Bud, factory as budFactory, seed} from '@roots/bud'
import {join} from 'path'

export {Bud} from '@roots/bud'

export const repoPath = (path: string) => join(process.cwd(), path)

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (options?: Bud.Options) =>
  await budFactory({
    mode: 'production',
    name: 'bud',
    config: {
      ...seed,
      ...(options?.config ?? {}),
      location: {
        ...seed.location,
        project: mockProject.path,
        ...(options?.config?.location ?? {}),
      },
    },
    ...(options ?? {}),
  })
