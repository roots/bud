import dataUri from 'mini-svg-data-uri'

import type {Factory} from '../index.js'

export const dataUriSvg: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setResourceQuery(/data-uri/)
    .setGenerator({dataUrl})
    .setType(`asset/inline`)

export const dataUrl = (data: Buffer) => dataUri(data.toString())
