// eslint-disable-next-line n/no-unpublished-import
import type {LoaderDefinitionFunction} from 'webpack'

// This loader matches @script tags and returns the contents of the first one.
const loader: LoaderDefinitionFunction<any> = function (source) {
  if (!this.resourcePath.match(/\.php$/)) return source

  const matches = source.matchAll(/@script\s?([\s\S]*)\s?@endscript/g)
  if (!matches) return ``

  let imports = []
  let body = []

  ;[...matches].map(([_, script]) => {
    script.split(`\n`).map(line => {
      line.trim().startsWith(`import`) ? imports.push(line) : body.push(line)
    })
  })

  return [...imports, ...body].join(`\n`)
}

export default loader
