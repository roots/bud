import type {Factory} from './index.js'

export const target: Factory<`target`> = async ({context, hooks, root}) =>
  hooks.filter(
    `build.target`,
    context.manifest?.browserslist
      ? `browserslist:${root.path(`package.json`)}`
      : `web`,
  )
