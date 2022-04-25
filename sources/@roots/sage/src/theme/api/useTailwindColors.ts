import {Bud} from '@roots/bud-framework'

export interface method {
  (): Promise<Bud>
}
export interface facade {
  (): Bud
}

export const method: method = async function () {
  const ctx = this as Bud

  const {getPalette, transformPalette} = await import(
    '../tailwind.adapter'
  )

  const palette = await getPalette(ctx.path('./tailwind.config.js'))

  ctx.extensions.get('wp-theme-json').setOptions(options => ({
    path: options.path,
    settings: {
      ...(options.settings ?? {}),
      color: {
        ...(options.settings.color ?? {}),
        palette: transformPalette(palette),
      },
    },
  }))

  return ctx
}
