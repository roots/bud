import * as CONSTANTS from '@repo/constants'
import {Bud, context, factory as budFactory, seed} from '@roots/bud'
import type {Config} from '@roots/bud-framework'
import {join} from 'node:path'

export const repoPath = (...path: Array<string>) =>
  join(CONSTANTS.REPO_PATH, ...(path ?? []))

export const mockProject = {
  path: repoPath('tests/util/project'),
}

export const factory = async (
  overrides?: Partial<Config.Context>,
): Promise<Bud> => {
  const ctx = await context.get(repoPath('tests/util/project'))

  const bud = await budFactory({
    ...ctx,
    label: 'bud-test',
    mode: 'production',
    basedir: repoPath('tests/util/project'),
    ...(overrides ?? {}),
    args: {
      cache: false,
      ci: true,
      ...(overrides?.args ?? {}),
    },
    manifest: {
      ...ctx.manifest,
      ...(overrides?.manifest ?? {}),
    },
    extensions: [...ctx.extensions, ...(overrides?.extensions ?? [])],
    seed: {
      ...seed,
      ...(overrides?.seed ?? {}),
    },
  })

  return bud
}

export {Bud}
