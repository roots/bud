import {Bud} from '@roots/bud'
import {Module} from '@roots/bud-framework'

import {projectInfo} from './util'
import {posix} from 'path'

import * as babel from '@roots/bud-babel'
import * as dependencies from '@roots/bud-wordpress-dependencies'
import * as entrypoints from '@roots/bud-entrypoints'
import * as esbuild from '@roots/bud-esbuild'
import * as externals from '@roots/bud-wordpress-externals'
import * as eslint from '@roots/bud-eslint'
import * as manifests from '@roots/bud-wordpress-manifests'
import * as postcss from '@roots/bud-postcss'
import * as prettier from '@roots/bud-prettier'
import * as react from '@roots/bud-react'
import * as stylelint from '@roots/bud-stylelint'
import * as tailwind from '@roots/bud-tailwindcss'
import * as typescript from '@roots/bud-typescript'

export const name: Module.Name = '@roots/sage'

export const boot: Module.Boot = (app: Bud) => {
  const {deps, files} = projectInfo(app)

  app
    .setPath({
      storage: app.env.get('APP_STORAGE') ?? 'storage/bud',
      src: app.env.get('APP_SRC') ?? 'resources',
      dist: app.env.get('APP_DIST') ?? 'public',
      publicPath: app.env.get('APP_PUBLIC_PATH') ?? 'public/',
    })
    .alias({
      '@fonts': app.path('src', 'fonts'),
      '@images': app.path('src', 'images'),
      '@scripts': app.path('src', 'scripts'),
      '@styles': app.path('src', 'styles'),
    })
    .html({enabled: false})
    .provide({jquery: ['$', 'jQuery']})

    /**
     * Conditionals
     */
    .when(deps.includes('postcss'), () => app.use(postcss))
    .when(deps.includes('tailwindcss'), () => app.use(tailwind))
    .when(files.includes('.eslintrc.js'), () => app.use(eslint))
    .when(files.includes('.stylelintrc'), () =>
      app.use(stylelint),
    )
    .when(files.includes('.prettierrc'), () => app.use(prettier))

    /**
     * Transpiler and extensions
     *
     * ESBuild doesn't support HMR. It is purely a transpiler.
     *
     * - snowpack & vite each have their own HMR solutions.
     * - snowpack published [this proposal](https://git.io/JYUVM)
     * - [Related](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf)
     *
     * Losing HMR in dev is not worth the ESBuild advantages.
     * Thus, app uses esbuild in production, and babel in development.
     */
    .when(
      app.isProduction,
      () =>
        app
          .use(esbuild)
          .esbuild.jsx()
          .minimize()
          .hash()
          .splitChunks()
          .runtime('single'),

      () =>
        app
          .use(babel)
          .when(deps.includes('typescript'), ({use}) =>
            use(typescript),
          )
          .when(deps.includes('react'), ({use}) => use(react))
          .proxy()
          .devtool(),
    )
    .use([entrypoints, dependencies, externals, manifests])

  app.hooks.on('item/minicss/options/publicPath', () =>
    posix.normalize(
      posix.dirname(
        posix.relative(app.path('dist'), app.path('src')),
      ),
    ),
  )
}
