const production = {
  before: () => {
    return
  },
  after: ({bud, compilerCallback}) => {
    bud.compiler.run((err, stats) => compilerCallback(stats))
  },
}

export {production as default}
