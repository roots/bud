import {path} from '@repo/constants'
import fs from 'fs-jetpack'
import {globby} from 'globby'
import {format} from 'prettier'

import type {TemplateDelegate} from './handlebars.js'
import {Handlebars, handlebars} from './handlebars.js'

const sources = await globby(
  path(`sources/@repo/markdown-kit/readme/templates/*.md`),
)

const templates: {
  [key: string]: TemplateDelegate
} = await sources.reduce(async (promised, filePath) => {
  const templates = await promised
  const source = await fs.readAsync(filePath).then(String)
  const template = handlebars.compile(source)

  return {
    ...templates,
    [`${filePath.split(`/`).pop().split(`.`).shift()}`]: template,
  }
}, Promise.resolve({}))

export {format, Handlebars, sources, templates, handlebars}
