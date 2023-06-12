import type {Factory} from './index.js'

export const snapshot: Factory<`snapshot`> = async ({env, hooks, path}) =>
  hooks.filter(`build.snapshot`, {
    buildDependencies: hooks.filter(
      `build.snapshot.buildDependencies`,
      env.isTrue(`CI`) ? {hash: true} : {timestamp: true},
    ),
    immutablePaths: hooks.filter(`build.snapshot.immutablePaths`, []),
    managedPaths: hooks.filter(`build.snapshot.managedPaths`, [
      ...new Set([path(`@modules`)]),
    ]),
    module: hooks.filter(
      `build.snapshot.module`,
      env.isTrue(`CI`) ? {hash: true} : {timestamp: true},
    ),
    resolve: hooks.filter(
      `build.snapshot.resolve`,
      env.isTrue(`CI`) ? {hash: true} : {timestamp: true},
    ),
    resolveBuildDependencies: hooks.filter(
      `build.snapshot.resolveBuildDependencies`,
      env.isTrue(`CI`) ? {hash: true} : {timestamp: true},
    ),
  })
