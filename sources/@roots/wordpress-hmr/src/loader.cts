export default (source: string) => {
  ;[
    ...source.matchAll(
      /roots\.register\.(plugin|block|format|filter|variation|style)s\(['"](.*)['"]\)/g,
    ),
  ].map(([match, type, query]) => {
    source = source.replace(match, makeCodeString(type, query))
  })

  /* no notify */
  ;[...source.matchAll(/roots\.register\.notify\(false\)/g)]?.map(
    ([match]) => {
      if (!match) return
      source = source.replace(match, makeNoNotifyString())
    },
  )

  return source
}

const makeCodeString = (type: string, query: string, enabled = true) => `
import * as __roots_${type}s from '@roots/wordpress-hmr/${type}s';

__roots_${type}s.register(
  () => import.meta.webpackContext(
    '${query}',
    {recursive: true, regExp: /.*\\.${type}\\..*$/}
  ),
  (id, context) => {
    if (import.meta.webpackHot) return import.meta.webpackHot.accept(id, context)
  },
);`

const makeNoNotifyString = () => `
import * as __roots_editor from '@roots/wordpress-hmr/editor';
__roots_editor.setNotify(false);
`
