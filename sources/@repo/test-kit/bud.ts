import * as CONSTANTS from '@repo/constants'
import {Bud, context, factory as budFactory, seed} from '@roots/bud'
import type {Config} from '@roots/bud-framework'
import {join} from 'node:path'

export const repoPath = (...path: Array<string>) =>
  join(CONSTANTS.REPO_PATH, ...(path ?? []))

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (options?: Config.Options): Promise<Bud> => {
  const ctx = await context.get(repoPath('tests/util/project'))

  const bud = await budFactory({
    label: 'bud',
    mode: 'production',
    basedir: repoPath('tests/util/project'),
    ...ctx,
    ...(options ?? {}),
    args: {
      ...(options?.args ?? {}),
      cache: false,
      ci: true,
    },
    seed: {
      ...seed,
      ...(options?.seed ?? {}),
    },
  })

  return bud
}

export {Bud}
