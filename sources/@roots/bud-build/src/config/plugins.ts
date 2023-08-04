import type {Factory} from '@roots/bud-build/config'

export const plugins: Factory<`plugins`> = async app => {
  const plugins = await app.extensions.make()
  return await app.hooks.filterAsync(`build.plugins`, plugins)
}
