import type {Extension} from '@roots/bud-framework'

export const jsFeature: Extension.CompilerPlugin = {
  name: '@roots/bud-esbuild/js',

  boot: app => {
    app.build
      .setItem('esbuild-js', {
        loader: `esbuild`,
        options: {loader: 'jsx', target: 'es2015'},
      })
      .rules.js.setUse(['esbuild-js'])
  },
}
