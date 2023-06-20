import type {Factory} from './index.js'

export const resolveLoader: Factory<`resolveLoader`> = async ({
  hooks,
  module,
}) =>
  hooks.filter(`build.resolveLoader`, {
    alias: hooks.filter(`build.resolveLoader.alias`, {
      'css-loader': await module.resolve(`@roots/bud-support/css-loader`),
      'file-loader': await module.resolve(
        `@roots/bud-support/file-loader`,
      ),
      'html-loader': await module.resolve(
        `@roots/bud-support/html-loader`,
      ),
      json5: await module.resolve(`@roots/bud-support/json5`),
      'mini-svg-data-uri': await module.resolve(`mini-svg-data-uri`),
      'style-loader': await module.resolve(
        `@roots/bud-support/style-loader`,
      ),
      toml: await module.resolve(`@roots/bud-support/toml`),
    }),
  })
