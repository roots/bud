export default (source: string) => {
  const matches = source.matchAll(
    /roots\.register\.(plugin|block|format)s\(['"](.*)['"]\)/g,
  )

  ;[...matches].map(([match, type, query]) => {
    source = source.replace(match, makeCodeString(type, query))
  })

  return source
}

const makeCodeString = (type: string, query: string) => `
import * as ${type}s from '@roots/wordpress-hmr/${type}s';

${type}s.register(
  () => import.meta.webpackContext(
    '${query}',
    {recursive: true, regExp: /.*\\.${type}\\..*$/}
  ),
  (id, context) => {
    if (import.meta.webpackHot) return import.meta.webpackHot.accept(id, context)
  },
);`
