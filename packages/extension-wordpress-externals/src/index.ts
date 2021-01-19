import {
  Plugin,
  WordPressExternals,
} from '@roots/wordpress-externals-webpack-plugin'
import type {Bud} from '@roots/bud'

// extension identifier
export const name = '@roots/wordpress-externals-webpack-plugin'

// @roots/wordpress-externals-webpack-plugin
export const make: Bud.Module.Make<
  Plugin,
  WordPressExternals.Options
> = () => new Plugin()

export const when = bud => {
  return (
    bud.disk.get('project').has('style.css') &&
    bud.disk
      .get('project')
      .read('style.css')
      .includes('Theme name:')
  )
}
