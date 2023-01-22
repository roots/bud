// eslint-disable-next-line n/no-unpublished-import
import type {LoaderDefinitionFunction} from 'webpack'

// This loader matches @script tags and returns the contents of the first one.
const loader: LoaderDefinitionFunction<{
  views: string
  routes: Record<string, string>
}> = function (source) {
  if (!this.resourcePath.match(/\.php$/)) return source

  const matcher = /@module\('([^']+)'\)([\s\S]+?)@endmodule/g

  const matches = [...(source.matchAll(matcher) ?? [])].map(match => {
    const [_, _route, script] = match
    const imports: Array<string> = []
    const code: Array<string> = []

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

    return {imports, code}
  })

  return matches
    .filter(Boolean)
    .map(
      ({imports, code}) =>
        `(async () => {\n${imports.join(`\n`)}\n${code.join(`\n`)}})();`,
    )
    .join(`\n\n`)
}

export default loader
