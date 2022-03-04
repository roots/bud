import {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import {Container} from '@roots/container'

import {WPThemeJson} from '..'

const {isFunction} = lodash

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
  (
    input?: Mutator | WPThemeJson['settings'],
    raw?: boolean,
  ): Promise<Framework>
}

export interface facade {
  (input?: Mutator | WPThemeJson['settings'], raw?: boolean): Framework
}

export const method: method = async function (
  input?: Mutator | WPThemeJson['settings'],
  raw?: boolean,
) {
  const ctx = this as Framework

  ctx.extensions.get('wp-theme-json').set('when', true)

  if (!input) return ctx

  isFunction(input)
    ? ctx.extensions
        .get('wp-theme-json')
        .setOptions(
          raw === true
            ? input(ctx.extensions.get('wp-theme-json').options.all())
            : input(ctx.extensions.get('wp-theme-json').options),
        )
    : ctx.extensions.get('wp-theme-json').setOptions(input)

  return ctx
}
