import {writeFile} from 'fs-extra'
import {format} from 'prettier'

import {createElement} from './createElement'
import {MarkdownRenderer} from './Renderer'

export async function render(element, filePath) {
  const container = createElement('ROOT', null, null)

  const node = MarkdownRenderer.createContainer(
    container,
    0,
    false,
    null,
  )

  MarkdownRenderer.updateContainer(element, node, null, null)

  const result = container.render()

  await writeFile(
    filePath,
    format(result, {parser: 'markdown'}),
    {
      encoding: 'utf8',
    },
  )
}
