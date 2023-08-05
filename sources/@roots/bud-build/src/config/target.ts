import type {Factory} from '@roots/bud-build/config'

export const target: Factory<`target`> = async ({context, hooks, root}) =>
  hooks.filter(
    `build.target`,
    context.manifest?.browserslist
      ? `browserslist:${root.path(`package.json`)}`
      : `web`,
  )
