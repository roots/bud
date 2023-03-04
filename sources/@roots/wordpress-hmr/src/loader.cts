export const pattern = /import\.meta\.blocks\(['"](.*)['"]\)/

export default (source: string) => {
  if (!pattern.test(source)) return source
  const [match, value] = source.match(pattern)

  return source.replace(
    match,
    `
  import load from '@roots/wordpress-hmr/blocks';

  load(
    () => {
      if (import.meta.webpackContext) return import.meta.webpackContext('${value}',
        {recursive: true, regExp: /.*\\.block\\..*$/}
      )
    },
    (context, load) => {
      if (import.meta.webpackHot) return import.meta.webpackHot.accept(context.id, load)
    },
  )`,
  )
}
