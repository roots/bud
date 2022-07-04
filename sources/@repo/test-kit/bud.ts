import * as CONSTANTS from '@repo/constants'
import {Bud, factory as budFactory, makeContext, seed} from '@roots/bud'
import type {Config} from '@roots/bud-framework'
import {join} from 'node:path'

export const repoPath = (...path: Array<string>) =>
  join(CONSTANTS.REPO_PATH, ...(path ?? []))

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (options?: Config.Options) => {
  const context = await makeContext(repoPath('tests/util/project'))

  const bud = await budFactory({
    name: 'bud',
    mode: 'production',
    dir: repoPath('tests/util/project'),
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

export {Bud}
