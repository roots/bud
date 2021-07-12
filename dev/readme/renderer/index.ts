import {writeFile} from 'fs-extra'

import {createElement} from './createElement'
import {MarkdownRenderer} from './Renderer'

async function render(element, filePath) {
  const container = createElement('ROOT', null, null)

  const node = MarkdownRenderer.createContainer(
    container,
    0,
    false,
    null,
  )

  MarkdownRenderer.updateContainer(element, node, null, null)

  const out = container.render()

  await writeFile(filePath, out, {encoding: 'utf8'})
}

export default render
