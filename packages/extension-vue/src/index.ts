import {VueLoaderPlugin} from 'vue-loader'

/** Patched compiler.*/
// eslint-disable-next-line
const compiler = require('./vue-template-compiler')
// eslint-disable-next-line
const loader = require.resolve('vue-loader')

const addVueStyle = (loaders: any[]) => [
  require.resolve('vue-style-loader'),
  ...loaders,
]

export const boot: Framework.Extension.Boot = (
  instance: Framework.Bud,
) => {
  ;['vue'].map(ext => {
    !instance.build.config
      .get('resolve.extensions')
      .includes(ext) &&
      instance.build.config.merge('resolve.extensions', [ext])
  })

  instance.alias({
    vue$: 'vue/dist/vue.esm.js',
  })

  instance.hooks.on('webpack.module.rules', rules => [
    ...rules,
    {
      test: /\.vue$/,
      use: [
        {
          loader,
          options: {
            compiler,
          },
        },
      ],
    },
  ])

  instance.extensions.register('vue-loader-plugin', {
    make: function () {
      return new VueLoaderPlugin()
    },
  })

  instance.hooks.on('webpack.module.rules.oneOf.css', css => ({
    ...css,
    use: addVueStyle(css.use),
  }))

  instance.hooks.on('webpack.module.rules.oneOf.sass', sass => ({
    ...sass,
    use: addVueStyle(sass.use),
  }))
}
