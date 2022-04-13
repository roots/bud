import {Bud, factory as budFactory, makeContext, seed} from '@roots/bud'
import {Config} from '@roots/bud-framework'
import {join} from 'path'

export {Bud}

export const repoPath = (path: string) => join(process.cwd(), path)

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (options?: Config.Options) => {
  const context = await makeContext(mockProject.path)

  const bud = await budFactory({
    name: 'bud',
    mode: 'production',
    ...(options ?? {}),
    context: {
      ...context,
      ...(options?.context ?? {}),
    },
    seed: {
      ...seed,
      ...(options?.seed ?? {}),
    },
  })

  return bud
}
