import globby from 'globby'

const production = {
  before: () => {
    return
  },
  after: ({bud, compilerCallback}) => {
    bud.compiler.run((err, stats) => compilerCallback(stats))

    bud.compiler.hooks.done.tap('bud-license-files', () => {
      globby
        .sync([
          bud.dist('*.LICENSE.txt'),
          bud.dist('**/*.LICENSE.txt'),
        ])
        .forEach(match => {
          bud.fs.move(
            match,
            bud.dist(`license/${bud.fs.basename(match)}`),
            true,
          )
        })

      bud.fs.readJson(bud.dist('manifest.json')).then(manifest => {
        bud.fs.outputFile(
          bud.dist('manifest.json'),
          bud.util.format(
            JSON.stringify({
              ...Object.entries(manifest)
                .filter(
                  (entry: [string, string]) =>
                    !entry[0].includes('.LICENSE.txt'),
                )
                .map(([key, value]) => ({
                  [key]: value,
                }))
                .reduce(
                  (acc = {}, curr) => ({
                    ...(acc ?? []),
                    ...curr,
                  }),
                  {},
                ),
            }),
            'json',
          ),
        )
      })
    })
  },
}

export {production as default}
