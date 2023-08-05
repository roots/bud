import type {Factory} from '@roots/bud-build/config'

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
      'style-loader': await module.resolve(
        `@roots/bud-support/style-loader`,
      ),
    }),
  })
