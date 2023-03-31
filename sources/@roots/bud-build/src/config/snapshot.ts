import type {Factory} from './index.js'

export const snapshot: Factory<`snapshot`> = async app =>
  app.hooks.filter(`build.snapshot`, {
    managedPaths: app.hooks.filter(`build.snapshot.managedPaths`, [
      ...new Set([app.path(`@modules`)]),
    ]),
  })
