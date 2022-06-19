import {REPO_PATH} from '@repo/constants'
import {log} from '@repo/logger'
import fs from 'fs-extra'
import {globby} from 'globby'
import hb from 'handlebars'
import {format} from 'prettier'

export async function registerPartials() {
  const sources = await globby(
    `${REPO_PATH}/sources/@repo/markdown-kit/readme/partials/*.md`,
  )

  log('partials on disk', sources)

  const partials = await sources.reduce(async (promised, path) => {
    const dictionary = await promised
    const templateSource = await fs.readFile(path).then(String)
    return {
      ...dictionary,
      [`${path.split('/').pop().split('.').shift()}`]: templateSource,
    }
  }, Promise.resolve({}))

  log('partials registered', partials)

  hb.registerPartial(partials)
}

export async function registerHelpers() {
  hb.registerHelper('dotPath', function (context, options) {
    return `${options.fn(this).replace(/\./, options.data.root.name)}`
  })
  hb.registerHelper('raw', function (options) {
    return options.fn(this)
  })
}

export async function getTemplates(): Promise<
  Record<string, hb.TemplateDelegate>
> {
  const sources = await globby(
    `${REPO_PATH}/sources/@repo/markdown-kit/readme/templates/*.md`,
  )

  const templates = await sources.reduce(async (promised, path) => {
    const dictionary = await promised
    const templateSource = await fs.readFile(path).then(String)
    const template = hb.compile(templateSource)
    return {
      ...dictionary,
      [`${path.split('/').pop().split('.').shift()}`]: template,
    }
  }, Promise.resolve({}))

  log('template created', templates)

  return templates
}

export async function render(
  template: hb.TemplateDelegate,
  dest: string,
  data: Record<string, any>,
) {
  const result = template(data)

  await fs.writeFile(dest, format(result, {parser: 'markdown'}), {
    encoding: 'utf8',
  })
}
