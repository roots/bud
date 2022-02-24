import {Framework} from '@roots/bud-framework'
import {Container} from '@roots/container'

import {WPThemeJson} from '..'

export interface method {
  (): Promise<Framework>
}

export interface facade {
  (): Framework
}

export const method: method = async function () {
  const ctx = this as Framework

  const {getPalette, transformPalette} = await import(
    '../tailwind.adapter'
  )
  const palette = await getPalette(
    ctx.path('project', 'tailwind.config.js'),
  )

  await ctx.api.call(
    'themeJson',
    (settings: Container<WPThemeJson['settings']>) =>
      settings.set('color.palette', transformPalette(palette)),
  )

  return ctx
}
