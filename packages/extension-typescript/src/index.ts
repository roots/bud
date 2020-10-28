export const registerLoader = [
  'ts-loader',
  require.resolve('ts-loader'),
]

export const registerItem = [
  'typescript',
  {
    loader: 'ts-loader',
    options: (bud: Framework.Bud) => ({
      configFile: bud.fs.resolve('tsconfig.json'),
    }),
  },
]

export const registerRule: Framework.Extension.Register = _bud => [
  'typescript',
  {
    test: ({patterns}) => patterns.get('typescript'),
    exclude: ({patterns}) => patterns.get('modules'),
    use: (bud: Framework.Bud) => [
      bud.build.getItem('typescript'),
    ],
  },
]

export const boot = (bud: Framework.Bud) => {
  bud.patterns.set('typescript', /\.(ts|tsx)$/)

  Object.assign(bud, {
    typescript: function (this: Framework.Bud, options: any) {
      return this
    },
  })
}
