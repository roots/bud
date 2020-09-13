import fs from 'fs-extra'

const production = {
  before: () => {
    return
  },
  after: ({bud, compilerCallback}) => {
    bud.compiler.run((err, stats) => {
      if (err) {
        throw err
      }

      compilerCallback(stats)
    })

    /**
     * @todo this should be a proper webpack plugin
     */
    bud.compiler.hooks.done.tap('bud-license-files', () => {
      bud.fs.glob
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

      fs.readJson('dist/manifest.json').then(manifest => {
        bud.fs.outputFile(
          bud.dist('manifest.json'),
          bud.util.pretty(
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
