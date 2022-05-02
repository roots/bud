import {REPO_PATH} from '@repo/constants'
import {Bud, factory as budFactory, makeContext, seed} from '@roots/bud'
import {Config} from '@roots/bud-framework/types'
import {join} from 'path'

jest.setTimeout(99999)

export {Bud}

export const repoPath = (...path: Array<string>) =>
  join(REPO_PATH, ...(path ?? []))

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (options?: Config.Options) => {
  const context = await makeContext(repoPath('tests/util/project'))

  const bud = await budFactory({
    name: 'bud',
    mode: 'production',
    ...(options ?? {}),
    context: {
      ...context,
      ...(options?.context ?? {}),
      args: {
        ...(options?.context?.args ?? {}),
        ci: true,
      },
    },
    seed: {
      ...seed,
      ...(options?.seed ?? {}),
    },
  })

  return bud
}
