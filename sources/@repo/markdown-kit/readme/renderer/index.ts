import {REPO_PATH} from '@repo/constants'
import fs from 'fs-jetpack'
import {globby} from 'globby'
import {format} from 'prettier'

import {Handlebars, handlebars, TemplateDelegate} from './handlebars.js'

const sources = await globby(
  `${REPO_PATH}/sources/@repo/markdown-kit/readme/templates/*.md`,
)

const templates: {
  [key: string]: TemplateDelegate
} = await sources.reduce(async (promised, path) => {
  const templates = await promised
  const source = await fs.readAsync(path).then(String)
  const template = handlebars.compile(source)

  return {
    ...templates,
    [`${path.split(`/`).pop().split(`.`).shift()}`]: template,
  }
}, Promise.resolve({}))

export {format, Handlebars, sources, templates, handlebars}
