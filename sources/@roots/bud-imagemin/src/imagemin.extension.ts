import type {Bud, Extension} from '@roots/bud-framework'
import ImageMinimizerPlugin, {
  squooshGenerate,
  squooshMinify,
  SquooshOptions,
} from 'image-minimizer-webpack-plugin'

import {imagemin} from './imagemin.config'

export const name: Extension.Module['name'] = '@roots/bud-imagemin'

export const options: Extension.Module['options'] | SquooshOptions = {
  test: /.(jpe?g|png|gif|tif|webp|svg|avif)$/i,
  minimizer: {
    implementation: squooshMinify,
    options: {},
  },
  generator: [
    {
      preset: 'webp',
      implementation: squooshGenerate,
      options: {
        encodeOptions: {webp: {quality: 90}},
      },
    },
  ],
}

export const api: {imagemin: imagemin} = {
  imagemin,
}

export const boot = async (app: Bud): Promise<void> => {
  app.hooks.on('build.optimization.minimizer', minimizer => [
    ...minimizer,
    new ImageMinimizerPlugin(
      app.extensions.get('@roots/bud-imagemin').options.all(),
    ),
  ])
}
