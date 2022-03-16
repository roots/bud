import {Framework} from '@roots/bud-framework'

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

  const palette = await getPalette(ctx.path('tailwind.config.js'))

  ctx.extensions
    .get('wp-theme-json')
    .setOption('settings.color.palette', transformPalette(palette))

  return ctx
}
