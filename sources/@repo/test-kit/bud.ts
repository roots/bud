import {Bud, factory as budFactory, makeContext} from '@roots/bud'
import {join} from 'path'

export {Bud}

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
  })

  return bud
}
