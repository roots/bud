import {Framework} from '@roots/bud-framework'
import {Container} from '@roots/container'

import {WPThemeJson} from '..'

/**
 * Callback function used to configure wordpress `theme.json`
 *
 * @public
 */
export interface Mutator {
  (json: Container<WPThemeJson['settings']>): Container<
    WPThemeJson['settings']
  >
}

export interface method {
  (callback: Mutator, raw?: boolean): Promise<Framework>
}

export interface facade {
  (callback: Mutator, raw?: boolean): Framework
}

export const method: method = async function (callback, raw = false) {
  const ctx = this as Framework

  ctx.extensions.get('wp-theme-json').set('when', true)

  if (!callback)
    throw new Error(`A callback must be provided to ${ctx.name}.themeJson`)

  if (raw) {
    const options = ctx.extensions.get('wp-theme-json').options.all()

    ctx.extensions
      .get('wp-theme-json')
      .setOptions(ctx.container(callback(options)))

    return ctx
  }

  ctx.extensions.get('wp-theme-json').mutateOptions(callback)

  return ctx
}
