import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import scss from 'highlight.js/lib/languages/scss'
import ts from 'highlight.js/lib/languages/typescript'
import isFunction from 'lodash-es/isFunction.js'
import * as parse5 from 'parse5'
import {adapter} from 'parse5-htmlparser2-tree-adapter'

import {theme} from './theme.js'

const colorizeNode = (node): string => {
  switch (node.type) {
    case `tag`:
      const hljsClass = /hljs-(\w+)/.exec(node.attribs.class)

      if (hljsClass) {
        const token = hljsClass[1]
        const nodeData = node.childNodes
          .map(node => colorizeNode(node))
          .join(``)

        return isFunction(theme[token]) ? theme[token](nodeData) : nodeData
      }

      return node.childNodes.map(node => colorizeNode(node)).join(``)

    case `text`:
      return node.data

    default:
      return node.data
  }
}

const colorize = (code: string): string => {
  // @ts-ignore
  const fragment = parse5.parseFragment(code, {treeAdapter: adapter})
  return fragment.childNodes.map(node => colorizeNode(node)).join(``)
}

!hljs.listLanguages().includes(`javascript`) &&
  hljs.registerLanguage(`javascript`, js)

!hljs.listLanguages().includes(`typescript`) &&
  hljs.registerLanguage(`typescript`, ts)

!hljs.listLanguages().includes(`css`) && hljs.registerLanguage(`css`, css)

!hljs.listLanguages().includes(`scss`) &&
  hljs.registerLanguage(`scss`, scss)

export default hljs

export const highlight = (code: string): string =>
  colorize(
    hljs.highlight(code, {
      language: `typescript`,
      ignoreIllegals: true,
    }).value,
  )
