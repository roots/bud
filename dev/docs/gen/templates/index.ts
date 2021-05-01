import * as cover from './cover'
import * as inner from './inner'
import _ from 'lodash'

const find = filePath =>
  filePath.includes('README.md') ? cover : inner

const transform = (
  pkg,
  filePath,
  content,
) => {
  const template = find(filePath)

  return _.join(
    [template.banner(pkg), content, template.footer(pkg)],
    `\n`,
  )
}

export {cover, inner, find, transform}
