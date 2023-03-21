import dataUri from '@roots/bud-support/mini-svg-data-uri'

import type {Factory} from '../index.js'

export const inlineSvg: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/inline/)
    .setGenerator({dataUrl})
    .setType(`asset/inline`)

export const dataUrl = (data: Buffer) => dataUri(data.toString())
