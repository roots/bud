import type {Factory} from '@roots/bud-build/registry'

import dataUri from '@roots/bud-support/mini-svg-data-uri'

const inlineSvg: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/inline/)
    .setGenerator({dataUrl})
    .setType(`asset/inline`)

const dataUrl = (data: Buffer) => dataUri(data.toString())

export {dataUrl, inlineSvg as default}
