import {Bud} from '@roots/bud'
import {Module} from '@roots/bud-framework'
import {posix} from 'path'

export const name: Module.Name = '@roots/sage'

export const boot: Module.Boot = (app: Bud) => {
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

    .when(app.isProduction, () => app.esbuild.jsx())

  app.hooks.on('item/minicss/options/publicPath', () =>
    posix.normalize(
      posix.dirname(
        posix.relative(app.path('dist'), app.path('src')),
      ),
    ),
  )
}
