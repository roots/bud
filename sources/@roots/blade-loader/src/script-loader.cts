import type {LoaderDefinitionFunction} from 'webpack'

const loader: LoaderDefinitionFunction<any> = function (source) {
  if (!this.resourcePath.match(/\.php$/)) return source

  return [...(source.matchAll(/@js\('([^']+)'\)([\s\S]+?)@endjs/g) ?? [])]
    .map(match => {
      const [_, _route, script] = match
      return script
    })
    .filter(Boolean)
    .join(`\n`)
}

export default loader
