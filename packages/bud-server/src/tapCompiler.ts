import createDomain from './createDomain'

const tapCompiler = bud => {
  bud.compiler.hooks.afterEmit.tap('bud', () => {
    bud.fs.readJson(bud.dist('manifest.json')).then(assets => {
      bud.fs.writeJson(
        bud.dist('manifest.json'),
        Object.entries(assets).reduce(
          (acc, [key, value]) => ({
            ...(acc ? acc : []),
            [key]: `${createDomain(bud)}${value}`,
          }),
          {},
        ),
      )
    })
  })
}

export {tapCompiler as default}
