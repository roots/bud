import type {Factory} from '@roots/bud-build/registry'

const image: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.image`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)
    .setGenerator({
      filename: `[path][name].[contenthash][ext][query]`,
    })

export {image as default}
