import {Bud, factory as budFactory, makeContext, seed} from '@roots/bud'
import {join} from 'path'

export {Bud} from '@roots/bud'

export const repoPath = (path: string) => join(process.cwd(), path)

export const mockProject = {
  path: repoPath('tests/util/project'),
}

type Options = {
  [K in keyof Bud.Options as `${K & string}`]?: any
}

export const factory = async (options?: Options) => {
  const context = await makeContext(mockProject.path)

  const bud = await budFactory({
    name: 'bud',
    mode: 'production',
    ...(options ?? {}),
    context: {
      ...context,
      ...(options?.context ?? {}),
    },
    config: {
      ...seed,
      ...(options?.config ?? {}),
      location: {
        ...seed.location,
        ...(options?.config?.location ?? {}),
      },
    },
  })

  return bud
}
