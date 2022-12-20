import type {Factory} from './index.js'

export const plugins: Factory<`plugins`> = async app =>
  await app.hooks.filterAsync(`build.plugins`, await app.extensions.make())
