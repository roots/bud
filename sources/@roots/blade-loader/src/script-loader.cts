import type {LoaderDefinitionFunction} from 'webpack'

const loader: LoaderDefinitionFunction<any> = function (source) {
  if (!this.resourcePath.match(/\.php$/)) return source

  return [...(source.matchAll(/@js\('([^']+)'\)([\s\S]+?)@endjs/g) ?? [])]
    .map(match => {
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
    .filter(Boolean)
    .map(
      ({imports, code}) =>
        `(async () => {\n${imports.join(`\n`)}\n${code.join(`\n`)}})();`,
    )
    .join(`\n`)
}

export default loader
