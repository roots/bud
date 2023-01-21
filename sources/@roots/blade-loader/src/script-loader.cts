// eslint-disable-next-line n/no-unpublished-import
import type {LoaderDefinitionFunction} from 'webpack'

// This loader matches @script tags and returns the contents of the first one.
const loader: LoaderDefinitionFunction<{
  views: string
  routes: Record<string, string>
}> = function (source) {
  if (!this.resourcePath.match(/\.php$/)) return source

  const matcher = /@script\('([^']+)'\)([\s\S]+?)@endscript/g

  const matches = [...(source.matchAll(matcher) ?? [])].map(match => {
    const [_, routeExpression, script] = match
    const imports: Array<string> = []
    const code: Array<string> = []

    let route = routeExpression
      .replaceAll(`*`, `.*`)
      .replaceAll(`/`, `\\/`)
      .replaceAll(`'`, ``)
      .replaceAll(`"`, ``)

    if (route !== `\\/`) {
      route = `\\/${route}`
    }

    script.split(`\n`).map((line: string) => {
      const importStatement = line.match(
        /import\s*(\w+\s*(,\s*\w+)*)?\s*(from)?\s*['"]([^'"]+)['"]/,
      )

      if (importStatement) {
        const [_match, defaultImport, namedImport, _from, signifier] =
          importStatement

        return imports.push(
          defaultImport
            ? `const {default: ${defaultImport}} = await import("${signifier}");`
            : `const {${namedImport}} = await import("${signifier}");`,
        )
      }

      return code.push(line)
    })

    return {
      route,
      imports,
      code,
    }
  })

  return matches
    .filter(Boolean)
    .map(({route, imports, code}) => {
      return `if (/^${route}\\/?$/.test(window.location.pathname)) {
      ;(async () => {
        ${imports.join(`\n`)}
        ${code.join(`\n`)}
      })();
    }`
    })
    .join(`\n\n`)
}

export default loader
