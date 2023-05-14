import {REPO_PATH} from '@repo/constants'
import fs from 'fs-jetpack'
import {globby} from 'globby'
import type {TemplateDelegate} from 'handlebars'
import Handlebars from 'handlebars'

let handlebars = Handlebars

const sources = await globby([
  `${REPO_PATH}/sources/@repo/markdown-kit/readme/partials/*.md`,
])

const partials = await sources.reduce(async (promised, path) => {
  const dictionary = await promised
  const templateSource = await fs.readAsync(path).then(String)

  return {
    ...dictionary,
    [`${path.split(`/`).pop().split(`.`).shift()}`]: templateSource,
  }
}, Promise.resolve({}))

handlebars.registerPartial(partials)

handlebars.registerHelper(`dotPath`, function (context, options) {
  return `${options.fn(this).replace(/\./, options.data.root.name)}`
})

handlebars.registerHelper(`raw`, function (options) {
  return options.fn(this)
})

export {handlebars, Handlebars}
export type {TemplateDelegate}
