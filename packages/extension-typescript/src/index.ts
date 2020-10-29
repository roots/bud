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

export const boot = (instance: Framework.Bud) => {
  instance.patterns.set('typescript', /\.(ts|tsx)$/)
  ;['ts', 'tsx'].map(ext => {
    !instance.build.config
      .get('resolve.extensions')
      .includes(ext) &&
      instance.build.config.merge('resolve.extensions', [ext])
  })

  Object.assign(instance, {
    typescript: function (this: Framework.Bud, options: any) {
      return this
    },
  })
}
