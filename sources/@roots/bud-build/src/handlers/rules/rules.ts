import * as json5Parser from 'json5'

import type {Factory} from '../index.js'

export const js: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.js`))
    .setInclude([() => path(`@src`)])
    .setUse(() => [])

export const css: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.css`))
    .setInclude([() => path(`@src`)])
    .setUse([`precss`, `css`])

export const cssModule: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.cssModule`))
    .setInclude([() => path(`@src`)])
    .setUse([`precss`, `cssModule`])

export const svg: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.svg`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)

export const webp: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.webp`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)

export const image: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setTest(() => filter(`pattern.image`))
    .setInclude([() => path(`@src`)])
    .setType(`asset/resource`)

export const font: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setType(`asset`)
    .setTest(() => filter(`pattern.font`))
    .setInclude([() => path(`@src`)])

export const json: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setType(`json`)
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.json`))
    .setParser({parse: json5Parser.parse})

export const yml: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.yml`))
    .setUse([`yml`])

export const html: Factory = ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(() => filter(`pattern.html`))
    .setUse([`html`])
