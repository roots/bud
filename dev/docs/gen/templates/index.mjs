import * as cover from './cover.mjs'
import * as inner from './inner.mjs'
import _ from 'lodash'

const find = filePath =>
  filePath.includes('README.md') ? cover : inner

const transform = (
  pkg,
  filePath,
  content,
  replacements = [],
) => {
  const template = find(filePath)

  const md = _.join(
    [template.banner(pkg), content, template.footer(pkg)],
    `\n`,
  )

  return replacements.reduce((a, [f, r]) => a.replace(f, r), md)
}

export {cover, inner, find, transform}
